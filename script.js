let currentStep = 0;
let steps = [];
let interval;
let time = 0;

function toggleSection(id) {
  const section = document.getElementById(id);
  section.classList.toggle('hidden');
}

function startCooking() {
  steps = document.querySelectorAll('#steps li');
  if (!steps.length) return;

  steps.forEach(step => step.style.background = '');
  currentStep = 0;
  steps[currentStep].style.background = '#fff2fa';
  time = 0;

  updateProgress();
  startTimerAnimation();
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    steps[currentStep].style.background = 'lightgreen';
    currentStep++;
    steps[currentStep].style.background = '#fff2fa';
    updateProgress();
  } else {
    steps[currentStep].style.background = 'lightgreen';
    clearInterval(interval);
    updateCircle(0); // show full circle
    document.getElementById('time-text').textContent = 'Done!';
    alert('🎉 All steps completed!');
  }
}

function updateProgress() {
  let percent = ((currentStep + 1) / steps.length) * 100;
  document.getElementById('progressBar').style.width = `${percent}%`;
}

function updateCircle(percent) {
  const circle = document.querySelector('.progress');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function startTimerAnimation() {
  clearInterval(interval);

  const prepMinutes = parseInt(document.getElementById('prep-value').textContent);
  const totalSeconds = prepMinutes * 60;
  const circle = document.querySelector('.progress');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const timerText = document.getElementById('time-text');
  timerText.textContent = `${totalSeconds}s`;

  interval = setInterval(() => {
    time++;
    const percent = (time / totalSeconds) * 100;
    updateCircle(percent);

    const remaining = totalSeconds - time;
    timerText.textContent = `${remaining}s`;

    if (time >= totalSeconds) {
      clearInterval(interval);
      timerText.textContent = 'Done!';
    }
  }, 1000);
}

