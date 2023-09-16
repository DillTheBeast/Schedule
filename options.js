// Saves options to chrome.storage
function saveOptions() {
  var PurpleColor = document.getElementById('PurpleColor').value;
  var BlueColor = document.getElementById('BlueColor').value;
  var GreenColor = document.getElementById('GreenColor').value;
  var YellowColor = document.getElementById('YellowColor').value;
  var OrangeColor = document.getElementById('OrangeColor').value;
  var TanColor = document.getElementById('TanColor').value;
  var PinkColor = document.getElementById('PinkColor').value;
  var RedColor = document.getElementById('RedColor').value;
  chrome.storage.sync.set({
    PurpleColor: PurpleColor,
    BlueColor: BlueColor,
    GreenColor: GreenColor,
    YellowColor: YellowColor,
    OrangeColor: OrangeColor,
    TanColor: TanColor,
    PinkColor: PinkColor,
    RedColor: RedColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Colors saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    PurpleColor: '', // Default value
    BlueColor: '', // Default value
    GreenColor: '', // Default value
    YellowColor: '', // Default value
    OrangeColor: '', // Default value
    TanColor: '', // Default value
    PinkColor: '', // Default value
    RedColor: '' // Default value
  }, function(items) {
    document.getElementById('PurpleColor').value = items.PurpleColor;
    document.getElementById('BlueColor').value = items.BlueColor;
    document.getElementById('GreenColor').value = items.GreenColor;
    document.getElementById('YellowColor').value = items.YellowColor;
    document.getElementById('OrangeColor').value = items.OrangeColor;
    document.getElementById('TanColor').value = items.TanColor;
    document.getElementById('PinkColor').value = items.PinkColor;
    document.getElementById('RedColor').value = items.RedColor;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);