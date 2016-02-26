var PushController = require('../parse-server/src/Controllers/PushController').PushController;
var UAPushAdapter = require('../index');

var pushConfig = {
  key: "aKey",
  secret:"aSecret",
  masterSecret: "aMasterSecret"
};

describe('UAPushAdapter', () => {
  
  beforeEach(() => {
    setServerConfiguration({
      serverURL: 'http://localhost:8378/1',
      appId: 'test',
      javascriptKey: 'test',
      dotNetKey: 'windows',
      clientKey: 'client',
      restAPIKey: 'rest',
      masterKey: 'test',
      push: new UAPushAdapter(pushConfig)
    });
  })
  
  require('../parse-server/spec/PushController.spec')
  
  it('can be initialized', (done) => {

    var adapter = new UAPushAdapter(pushConfig);

    expect(adapter.getValidPushTypes()).toEqual(['ios', 'android', 'winrt', 'winphone', 'dotnet']);
    done();
  });
  
  it('can create a push controller', (done) => {
     expect( () => {
      new PushController(new UAPushAdapter(pushConfig)); 
     }).not.toThrow();
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
