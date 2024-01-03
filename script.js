
const scriptURL = 'https://script.google.com/macros/s/AKfycby2O-AHFZmcpL1cqIUXbq-AwjBaiXRUQunEYOTRgqNjAQ4EoKsOd9iXIee3A5rDaLaz/exec';

const form = document.forms['submit-to-google-sheet'];


form.addEventListener('submit', e => {
    e.preventDefault();
    if (!hasFormBeenSubmittedToday()) {
        markFormAsSubmittedToday();
    } 
    else{
        alert('You have already submitted the form today.');
    };
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
});
// ***************************//
// Time and Date section
function updateDateTime() {
    // Create a new Date object with the current date and time
    const now = new Date();

    // Adjust for the Indian Standard Time (IST) offset (UTC+5:30)
    const indiaTime = new Date(now.getTime());

    // Manually construct the customized date and time string
    const day = new Intl.DateTimeFormat('en-IN', { weekday: 'long' }).format(indiaTime);
    const date = indiaTime.getDate();
    const month = new Intl.DateTimeFormat('en-IN', { month: 'long' }).format(indiaTime);
    const year = indiaTime.getFullYear();
    const time = indiaTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const formattedDate = `${day}, ${date} ${month} ${year}`;
    const formattedTime = `${time}`;

    // Display the formatted date and time
    document.getElementById('date').textContent = formattedDate;
    document.getElementById('dateInner').value = formattedDate;
    document.getElementById('time').textContent = formattedTime;
    document.getElementById('timeInner').value = formattedTime;
}
// Update the date and time every second
setInterval(updateDateTime, 1000);
// Initial update
updateDateTime();
// *************************************//

function markFormAsSubmittedToday() 
{
    localStorage.setItem('lastSubmissionDate', new Date().toISOString());
}

function hasFormBeenSubmittedToday() {
    const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');
    if (lastSubmissionDate) 
    {
        return new Date(lastSubmissionDate).toDateString() === new Date().toDateString();
    }
    return false;
}

// ******************************//
