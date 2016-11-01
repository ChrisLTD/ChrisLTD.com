# Setting up CarrierWave with S3 for Rails 4

If you have a Rails app on [Heroku](http://heroku.com) you might need to handle user uploads. If so, you’ll need to send your files to another server. Rails generally stores uploaded files in the `public` folder, but due to the [architecture](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem) of Heroku, that folder will be cleared frequently.

One option is paying for a Heroku add-on like [Bucketeer](https://elements.heroku.com/addons/bucketeer) that gives you the illusion of uploading your files to the `public` folder but actually stores your files in an Amazon S3 bucket.

Another option, which I’ll walk you through here, is uploading your files to S3 directly through a Gem like [CarrierWave](https://github.com/carrierwaveuploader/carrierwave) [^paperclip].

Sign up for S3

Create S3 bucket

Create IAM user

Grant IAM user bucket permissions

{
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:DeleteObject"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::timekiwi/*",
                "arn:aws:s3:::timekiwi",
                "arn:aws:s3:::timekiwi-dev/*",
                "arn:aws:s3:::timekiwi-dev"
            ]
        }
    ]
}

Install CarrierWave, Install Fog-AWS, dotenv

Create Uploader

Add s3 credentials to dotenv file

push s3 credentials to heroku

heroku config:set GITHUB_USERNAME=joesmith

Configure Fog-AWS

Attach uploader to model


[^paperclip]: [PaperClip](https://github.com/thoughtbot/paperclip) is another popular option.