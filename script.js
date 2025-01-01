// Process and map pasted data
document.querySelector('.input-area').addEventListener('input', function(e) {
    const text = e.target.value.trim();
    const lines = text.split('\n');
    const data = {};

    let currentKey = '';
    lines.forEach(line => {
        if (line.includes(':')) {
            const [key, value] = line.split(':').map(s => s.trim());
            currentKey = key.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
            data[currentKey] = value || '';
        } else if (line.trim() && currentKey) {
            data[currentKey] = line.trim();
        }
    });

    // Map the data to form fields
    const fieldMap = {
        'First name': 'firstName',
        'Last name': 'lastName',
        'Owner Home Address': 'homeAddress',
        'Owner Phone Number': 'ownerPhone',
        'Owner Email address': 'ownerEmail',
        'Social Security': 'ssn',
        'Confirm Social Security': 'confirmSSN',
        'Location Name (DBA)': 'locationName',
        'Legal Name': 'legalName',
        'Location Address': 'locationAddress',
        'Location Phone Number': 'locationPhone',
        'Location Email': 'locationEmail'
    };

    // Fill the form fields
    Object.entries(fieldMap).forEach(([key, id]) => {
        if (data[key]) {
            document.getElementById(id).value = data[key];
        }
    });

    // Handle required files checkboxes
    const requiredFilesText = text.split('required files:')[1];
    if (requiredFilesText) {
        const checkboxes = {
            'Tax Id': 'taxId',
            'Driver License': 'driverLicense',
            'Voided Check': 'voidedCheck',
            'Social Security': 'socialSecurity',
            'FNS/EBT': 'fnsEbt',
            'Other': 'other'
        };

        Object.entries(checkboxes).forEach(([label, id]) => {
            const checkbox = document.getElementById(id);
            if (checkbox && requiredFilesText.toLowerCase().includes(label.toLowerCase())) {
                checkbox.checked = true;
            }
        });
    }
});

// Clear the form
function clearForm() {
    document.querySelector('.input-area').value = '';
    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}
