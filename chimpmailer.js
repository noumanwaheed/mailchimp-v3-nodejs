var  Mailchimp = require('mailchimp-api-v3');

class ChimpMailer {

    constructor(api_key,list_id,mail_from,reply_to){
        this.mailchimp = new Mailchimp(api_key);
        this.list_id = list_id;
        this.mail_from = mail_from;
        this.reply_to = reply_to;
    }

    async subscribe(email_address) {
        let self = this;
        return new Promise(function (resolve,reject) {
            try {
                let subscriber_hash = require('crypto').createHash('md5').update(email_address).digest('hex');
                self.mailchimp.get({path: `lists/${self.list_id}/members/${subscriber_hash}`}).then(response => {
                    if (response['status'] != undefined && response['status'] !== 'subscribed') {
                        self.mailchimp.post({path: `lists/${self.list_id}/members`}, {
                            'email_address': email_address,
                            'status': 'subscribed'
                        }).then(response => {
                            resolve(response);
                        }).catch(err => {
                            reject(err);
                        });
                    }
                    else {
                        resolve(response);
                    }
                }).catch(err => {
                    self.mailchimp.post({path: `lists/${self.list_id}/members`}, {
                        'email_address': email_address,
                        'status': 'subscribed'
                    }).then(response => {
                        resolve(response);
                    }).catch(err => {
                        reject(err);
                    });
                });
            }
            catch(err){
                reject(err);
            }
        });
    }
    async createCompaign(email_address, subject, template_id)
    {
        let self = this;
        return new Promise(function (resolve,reject) {
            try {
                self.mailchimp.post({path: `campaigns`}, {
                    'type': 'regular',
                    'recipients': {
                        'list_id': self.list_id,
                        'segment_opts':
                            {
                                'match':
                                    'all',
                                'conditions':
                                    [{
                                        'condition_type': 'EmailAddress',
                                        'field': 'EMAIL',
                                        'op': 'is',
                                        'value': email_address
                                    }]
                            },
                    },
                    'settings':
                        {
                            'subject_line': subject,
                            'from_name': self.mail_from,
                            'reply_to': self.reply_to,
                            'template_id': template_id,
                        },
                }).then(response => {
                    let campaign_id = null;
                    if (response['id'])
                        campaign_id = response['id'];
                    resolve(campaign_id);
                }).catch(err => {
                    reject(err);
                });
            }
            catch(err){
                reject(err);
            }
        });
    }
    async setTemplateContent(template_id,std_content,campaign_id){
        let self = this;
        return new Promise(function (resolve,reject) {
            try {
                self.mailchimp.put({path: `campaigns/${campaign_id}/content`}, {
                    'template': {
                        'id': template_id,
                        'sections': std_content
                    }
                }).then(response => {
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            }
            catch(err){
                reject(err);
            }
        });
    }
    async sendCompaign(email_address, subject, template_id, std_content)
    {
        let self = this;
        return new Promise(function (resolve,reject) {
            try {
                self.subscribe(email_address).then(response => {
                    self.createCompaign(email_address, subject, template_id).then(campaign_id => {
                        self.setTemplateContent(template_id,std_content,campaign_id).then(response => {
                            self.mailchimp.post({path: `campaigns/${campaign_id}/actions/send`}).then(response => {
                                resolve(response);
                            }).catch(err => {
                                reject(err);
                            });
                        }).catch(err => {
                            reject(err);
                        });
                    }).catch(err => {
                        reject(err);
                    });
                }).catch(err => {
                    reject(err);
                });
            }
            catch(err){
                reject(err);
            }
        });
    }
    async sendExampleCompaign(email_address,subject,template_id,content00,content01){
        let self = this;
        let std_content = {
            'std_content00' : content00,
            'std_content01' : content01
        };
        return new Promise(function (resolve,reject) {
            try {
                self.sendCompaign(email_address, subject, template_id, std_content).then(response => {
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            }
            catch(err){
                reject(err);
            }
        });
    }
}

module.exports = ChimpMailer;
