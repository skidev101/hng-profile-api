import http from 'http';

const TEST_URL = 'http://localhost:3000/me';

console.log('Testing profile API...\n');

const testEndpoint = () => {
  return new Promise((resolve, reject) => {
    http.get(TEST_URL, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          console.log('Response received\n');
          console.log('Status Code:', res.statusCode);
          console.log('Content-Type:', res.headers['content-type']);
          console.log('\n Response Body:');
          console.log(JSON.stringify(response, null, 2));
          
          // Validate response structure
          console.log('\n Validation:');
          
          const checks = [
            { name: 'Status code is 200', pass: res.statusCode === 200 },
            { name: 'Content-Type is application/json', pass: res.headers['content-type']?.includes('application/json') },
            { name: 'Has status field', pass: 'status' in response },
            { name: 'Status is "success"', pass: response.status === 'success' },
            { name: 'Has user object', pass: 'user' in response },
            { name: 'User has email', pass: response.user?.email?.length > 0 },
            { name: 'User has name', pass: response.user?.name?.length > 0 },
            { name: 'User has stack', pass: response.user?.stack?.length > 0 },
            { name: 'Has timestamp', pass: 'timestamp' in response },
            { name: 'Timestamp is ISO 8601', pass: !isNaN(Date.parse(response.timestamp)) },
            { name: 'Has fact field', pass: 'fact' in response },
            { name: 'Fact is not empty', pass: response.fact?.length > 0 }
          ];
          
          checks.forEach(check => {
            console.log(`${check.pass ? 'Passed:' : 'Failed:'} ${check.name}`);
          });
          
          const allPassed = checks.every(c => c.pass);
          
          if (allPassed) {
            console.log('\n All tests passed! API is working correctly.');
          } else {
            console.log('\n Some tests failed.');
          }
          
          resolve(allPassed);
        } catch (error) {
          console.error('Error parsing response:', error.message);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error('Error connecting to API:', error.message);
      console.log('\n Make sure the server is running: pnpm start');
      reject(error);
    });
  });
};

// Run test
testEndpoint()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));