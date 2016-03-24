var UAPushAdapter = require('../index');

var pushConfig = {
  key: process.env.UA_KEY,
  secret: process.env.UA_SECRET,
  masterSecret: process.env.UA_MASTER_SECRET
};

describe('UAPushAdapter', () => {

  it('can be initialized', (done) => {

    var adapter = new UAPushAdapter(pushConfig);

    expect(adapter.getValidPushTypes()).toEqual(['ios', 'android', 'winrt', 'winphone', 'dotnet']);
    done();
  });

  it('can generate requests', (done) => {
    // Mock installations
    var installations = [
      {
        deviceType: 'android',
        deviceToken: 'androidToken'
      },
      {
        deviceType: 'ios',
        deviceToken: 'iosToken'
      },
      {
        // Invalid
        deviceType: 'win',
        deviceToken: 'winToken'
      },
      {
        // invalid
        deviceType: 'android',
        deviceToken: undefined
      }
    ];

    var requests = UAPushAdapter.createRequests({data: {}}, installations);
    expect(requests.length).toBe(2);
    done();
  });

  it('fails to generate requests with empty', (done) => {
    // Mock installations
    var installations = [
      {
        deviceType: 'android',
        deviceToken: 'androidToken'
      },
      {
        deviceType: 'ios',
        deviceToken: 'iosToken'
      },
      {
        // Invalid
        deviceType: 'win',
        deviceToken: 'winToken'
      },
      {
        // invalid
        deviceType: 'android',
        deviceToken: undefined
      }
    ];

    var requests = UAPushAdapter.createRequests({}, installations);
    expect(requests.length).toBe(0);
    done();
  });

  it("can post the correct data", (done) => {

    var adapter = new UAPushAdapter(pushConfig)

    var installations = [
      {
        deviceType: 'android',
        deviceToken: 'androidToken'
      },
      {
        deviceType: 'ios',
        deviceToken: 'iosToken'
      },
      {
        deviceType: 'win',
        deviceToken: 'winToken'
      },
      {
        deviceType: 'android',
        deviceToken: undefined
      }
    ];

    var data = {'data':{
  		'title': 'Example title',
  		'alert': 'Example content',
  		'content-available':1,
  		'misc-data': 'Example Data'
  	}}

    adapter.send(data, installations).then(function(res){
      fail('Should not succeed');
      done();
    }, function(err){
      done();
    });
  });
});
