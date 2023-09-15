// Saves options to chrome.storage
function saveOptions() {
  var purpleColor = document.getElementById('PurpleColor').value;
  chrome.storage.sync.set({
    PurpleColor: purpleColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    PurpleColor: '' // Default value
  }, function(items) {
    document.getElementById('PurpleColor').value = items.PurpleColor;
  });
}

// Load current settings when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);