import * as AWS from "aws-sdk";
import _ from "lodash";
import config from "../config";
import CommonEnum from "../enum";

class SQSInstance {
  private readonly sqs: AWS.SQS;

  constructor() {
    if (
      _.isUndefined(config.AWS_ACCESS_KEY) ||
      _.isUndefined(config.AWS_SECRET_KEY)
    ) {
      throw new Error(CommonEnum.ErrorStatus.IS_NOT_VALID_REQUIRE_AWS_KEY);
    }

    if (_.isEmpty(config.SQS_END_POINT) || _.isEmpty(config.SQS_REGION)) {
      throw new Error(
        CommonEnum.ErrorStatus.IS_NOT_VALID_REQUIRE_AWS_ENDPOINT_INFO,
      );
    }

    AWS.config.update({
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_KEY,
    });

    this.sqs = new AWS.SQS({
      endpoint: config.SQS_END_POINT,
      region: config.SQS_REGION,
    });
  }

  get instance(): AWS.SQS {
    return this.sqs;
  }
}

export default new SQSInstance();
