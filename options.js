// Saves options to chrome.storage
function saveOptions() {
    var checkboxValue = document.getElementById('myCheckbox').checked;
    chrome.storage.sync.set({
      myFeatureEnabled: checkboxValue
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores checkbox state using the preferences stored in chrome.storage.
  function restoreOptions() {
    chrome.storage.sync.get({
      myFeatureEnabled: true // Default value
    }, function(items) {
      document.getElementById('myCheckbox').checked = items.myFeatureEnabled;
    });
  }
  
  // Load current settings when the DOM is fully loaded.
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('myCheckbox').addEventListener('click', saveOptions);
  