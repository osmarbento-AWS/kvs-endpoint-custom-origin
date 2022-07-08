## KVS get domain endpoint and replace the origin endpoint
This is a sample only, not validated for production use cases

**1.** It get the KVL HLS endpoint and pass to the function
**2.** Origin endpoint is the replace by the KVS endpoint

## usage instruction

### requeriments
serverless

### configuration
**1.** edit the file serverless and set your profile, if default, comment the line

``` yaml
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
#  profile: def
```

**2.** replace the arn of the channel / stream

```js
    var params = {
      APIName: "GET_HLS_STREAMING_SESSION_URL",
      StreamARN:
        "<YOUR ARN>",
    };
```

**3.** deploy the lambda

```sh
serverless deploy
```

**4.** in the aws console, deploy to your cloudfront distribution as a lambda@edge
Follow the step 7 of [this instructions](https://github.com/aws-samples/cloudfront-secure-media)
The original origin can be anything, including blank.


## Extras
[KVS JV Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KinesisVideo.html#getSignalingChannelEndpoint-property)

[Cloudfront reference funcitons](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html)

Please note: this is a reference code
```
Copyright 2022 Amazon.com and its affiliates; all rights reserved.
This file is Amazon Web Services Content and may not be duplicated or distributed without permission.
```