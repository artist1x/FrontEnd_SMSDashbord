# Vodafone Cash Transaction Tracker

A real-time transaction tracking system for Vodafone Cash payments with Google Sheets integration.

## Features

- Real-time transaction monitoring
- Google Sheets integration for data storage
- Secure authentication with Google Sign-In
- Beautiful dashboard with live updates
- Search and filter transactions
- Responsive design

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. In a separate terminal, start the backend server:
   ```bash
   npm run server
   ```

## Google Sheets Setup

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create service account credentials
4. Share your Google Sheet with the service account email
5. Add the credentials file path to .env

## SMS Integration

For SMS integration, you'll need to create an Android app or use a service like Twilio. The app should:

1. Listen for incoming SMS messages
2. Parse Vodafone Cash transaction messages
3. Send the data to the backend API

Example SMS parser for Android (Kotlin):

```kotlin
class SmsReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == "android.provider.Telephony.SMS_RECEIVED") {
            val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
            messages.forEach { message ->
                if (message.originatingAddress == "VODAFONE") {
                    parseAndSendTransaction(message.messageBody)
                }
            }
        }
    }
}
```

## Environment Variables

- `VITE_API_URL`: Backend API URL
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `PORT`: Backend server port
- `CLIENT_URL`: Frontend URL
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to Google service account credentials
- `SPREADSHEET_ID`: Google Sheets spreadsheet ID

## License

MIT