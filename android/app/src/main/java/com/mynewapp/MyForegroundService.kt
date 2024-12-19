package com.mynewapp

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyForegroundService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        Log.d("MyForegroundService", "Message received: ${remoteMessage.data}")

        // Check for "wakeUp" key in the notification data
        val shouldWakeUp = remoteMessage.data["wakeUp"] == "true"
        if (shouldWakeUp) {
            wakeUpScreen()
        }
    }

    private fun wakeUpScreen() {
        val powerManager = getSystemService(POWER_SERVICE) as PowerManager
        val wakeLock = powerManager.newWakeLock(
            PowerManager.FULL_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP or PowerManager.ON_AFTER_RELEASE,
            "MyApp::WakeLock"
        )
        wakeLock.acquire(5000) // Wake the screen for 3 seconds
        wakeLock.release()
    }
}
