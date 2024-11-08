document.addEventListener('DOMContentLoaded', function() {
        const observerOptions = {
        root: null, 
        threshold: 0.2 
    };

    const calculatorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                calculatorObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);


    document.querySelectorAll('.calculator-box').forEach(calculator => {
        calculator.classList.add('calculator-hidden'); // Initially hide
        calculatorObserver.observe(calculator);
    });


    const calculatorTitle = document.querySelector('.calculators h2');
    if (calculatorTitle) {
        calculatorTitle.classList.add('calculator-hidden');
        calculatorObserver.observe(calculatorTitle);
    }
});


window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.card, .stat-box');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if(position.top < window.innerHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});



function calculateLoan() {
    // Get input values
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const interest = parseFloat(document.getElementById('loanInterest').value);
    const years = parseFloat(document.getElementById('loanTerm').value);

    // Validate inputs
    if (!amount || !interest || !years) {
        alert('Please fill in all fields');
        return;
    }

    // Calculate loan
    const monthlyInterest = interest / 100 / 12;
    const totalPayments = years * 12;
    const emi = amount * monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments) 
                / (Math.pow(1 + monthlyInterest, totalPayments) - 1);
    const totalAmount = emi * totalPayments;
    const totalInterest = totalAmount - amount;

    const resultDiv = document.getElementById('loanResult');
    resultDiv.classList.remove('show');
    
    
    setTimeout(() => {
        document.getElementById('emiAmount').textContent = '₹' + emi.toFixed(2);
        document.getElementById('totalPayment').textContent = '₹' + totalAmount.toFixed(2);
        document.getElementById('totalInterest').textContent = '₹' + totalInterest.toFixed(2);
        resultDiv.classList.add('show'); 
    }, 100);
}


function calculateInterest() {
    
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);

    
    if (!principal || !rate || !time) {
        alert('Please fill in all fields');
        return;
    }

    // Calculate simple interest
    const interest = (principal * rate * time) / 100;
    const totalAmount = principal + interest;

    
    const resultDiv = document.getElementById('interestResult');
    resultDiv.classList.remove('show');
        setTimeout(() => {
        document.getElementById('simpleInterest').textContent = '₹' + interest.toFixed(2);
        document.getElementById('totalAmount').textContent = '₹' + totalAmount.toFixed(2);
        resultDiv.classList.add('show'); 
    }, 100);
}

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) this.value = 0;
    });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const formElements = this.elements;
    let isValid = true;
    
    for(let element of formElements) {
        if(element.required && !element.value) {
            isValid = false;
            element.style.borderColor = 'red';
        } else {
            element.style.borderColor = '#ddd';
        }
    }
    
    if(isValid) {
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});


window.addEventListener('load', function() {
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-container');
    
    contactInfo.style.opacity = '0';
    contactForm.style.opacity = '0';
    
    setTimeout(() => {
        contactInfo.style.transition = 'opacity 0.5s ease-in';
        contactForm.style.transition = 'opacity 0.5s ease-in';
        
        contactInfo.style.opacity = '1';
        contactForm.style.opacity = '1';
    }, 100);
});


