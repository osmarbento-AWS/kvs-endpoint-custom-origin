//author: osmarb@amazon.com
//Osmar Bento da Silva Junior
// Copyright 2022 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated or distributed without permission.
"use strict";

// get the session url from KVS
const AWS = require("aws-sdk");
const kinesisvideo = new AWS.KinesisVideo({ apiVersion: "2017-09-30" });

// replace the origin custom origin
module.exports.kvscustomorigin = async (event, context, callback) => {
  let endPoint = await getKVSendPoint();
  // KVS params
  async function getKVSendPoint() {
    var params = {
      APIName: "GET_HLS_STREAMING_SESSION_URL",
      StreamARN: "<YOUR ARN>",
    };

    //KVS call
    var hlsEndpoint = await kinesisvideo
      .getDataEndpoint(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        //else console.log(data);
      })
      .promise();
    return hlsEndpoint;
  }
  // replace the orgin by a custom origin
  const request = event.Records[0].cf.request;

  /* Set custom origin fields*/
  if (endPoint.DataEndpoint) {
    request.origin = {
      custom: {
        domainName: endPoint.DataEndpoint,
        port: 443,
        protocol: "https",
        path: "",
        sslProtocols: ["TLSv1", "TLSv1.1"],
        readTimeout: 5,
        keepaliveTimeout: 5,
        customHeaders: {},
      },
    };

    request.headers["host"] = [{ key: "host", value: endPoint.DataEndpoint }];
    callback(null, request);
  }
};
