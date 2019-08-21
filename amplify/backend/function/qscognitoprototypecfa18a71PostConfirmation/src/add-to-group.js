/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
  const groupParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
  };

  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  console.log('group: ' + process.env.GROUP);
  console.log('user pool id: ' + event.userPoolId);
  console.log('username: ' + event.userName);

  // get group, if it doesn't exist then create the group
  cognitoidentityserviceprovider.getGroup(groupParams).promise()
  .catch(err => {
    if(err && err.code === 'ResourceNotFoundException') {
      return cognitoidentityserviceprovider.createGroup(groupParams).promise();
    } else {
      throw err;
    }
  })
  // add the user to the group
  .then(() => cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise())
  .then(data => callback(null, data), err => callback(err));
};
