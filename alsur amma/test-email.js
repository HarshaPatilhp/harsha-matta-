// Test email functionality
const testEmail = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        sevaName: 'Test Seva',
        date: '2024-02-25',
        numberOfPeople: '1',
        gotra: 'Test Gotra',
        nakshatra: 'Test Nakshatra',
        lunchRequired: false,
        bookingId: 'TEST123'
      })
    });

    const result = await response.json();
    console.log('Email test result:', result);
  } catch (error) {
    console.error('Email test failed:', error);
  }
};

testEmail();
