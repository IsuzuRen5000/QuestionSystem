const totalQuestions = 100; // 題目數量
const numberlength = totalQuestions.toString().length; // 題號長度
const questionTable = document.getElementById('questionTable').appendChild(document.createElement('tbody'));
const container = document.getElementById('jumpLinks');

var checkAnsisShow = true; // 題目總覽是否顯示
// 題目總覽按鈕
const checkAnswerButton = document.querySelector('#checkAnsBtn').addEventListener('click', () => {
    checkAnsisShow = !checkAnsisShow;
    let el = document.querySelector('#checkAnsBtn');
    let window = document.querySelector('#hoverArea');
    if (checkAnsisShow) {
        el.classList.add('active');
        window.classList.replace('hidden', 'show');
        window.classList.add('show');
    }else{
        try{
            el.classList.remove('active');
            window.classList.replace('show', 'hidden');
            window.classList.add('hidden');
        }catch(e){
            console.log('active class not found');
        }
    }
});

for (let i = 1; i <= totalQuestions; i++) {
    const row = document.createElement('tr');
    row.id = `q${i.toString().padStart(numberlength, '0')}`;

    const numberCell = document.createElement('td');
    numberCell.textContent = i;
    
    const questionCell = document.createElement('td');
    questionCell.innerHTML = `<h4>${i}. Lorem ipsum dolor sit amet consecte ${i}</h4>`
    // const questionCell = document.createElement('td');
    for (let j = 0; j < 4; j++) {
        const div = document.createElement('div');
        div.className = 'question-input-group';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${row.id}`;
        input.id = `${row.id}${j}`;
        input.className = 'form-check-input';
        const label = document.createElement('label');
        label.setAttribute('for', `${row.id}${j}`);
        label.textContent = `選項 ${String.fromCharCode(65 + j)}`;
        div.appendChild(input);
        div.appendChild(label);
        questionCell.appendChild(div);
    }
   
    //     <div class="question-input-group">
    //     <input type="radio" 
    //            id="${row.id}${index}"
    //            name="q${i}"> 
    //     <label for="${row.id}${index++}">
    //         a. 選項 A
    //     </label>
    //     </div>
    // `;

    row.appendChild(questionCell);
    questionTable.appendChild(row);

    // 跳轉連結
    const link = document.createElement('a');
    link.href = `#${row.id}`;
    link.textContent = `${i.toString().padStart(numberlength, '0')}`;
    link.style.display = 'block';
    link.style.margin = '5px 0';
    link.style.color = 'red';
    link.id = `link-${row.id}`;
    container.appendChild(link);

    // 監控選項
    const inputs = questionCell.querySelectorAll(`input[name="${row.id}"]`);
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            const linkElement = document.getElementById(`link-${row.id}`);
            if (input.checked) {
                linkElement.style.color = 'blue';
                linkElement.className = 'answered';
            }
        });
    });
}

// function submitAnswers() {
//     const answers = {};
//     for (let i = 1; i <= totalQuestions; i++) {
//         const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
//         answers[`q${i}`] = selectedOption ? selectedOption.value : null;
//     }
//     console.log("送出的答案：", answers);
//     alert("答案已送出！請查看主控台以檢視詳細答案。");
// }

// const submitButton = document.createElement('button');
// submitButton.textContent = "送出答案";
// submitButton.style.margin = "1px auto";
// submitButton.style.marginBottom = "10%";
// submitButton.style.display = "block";
// submitButton.onclick = submitAnswers;
// document.body.appendChild(submitButton);


// 倒數計時設定單位是秒
const mysumtime = 3600; // 60分鐘
let timeRemaining = mysumtime;

// 更新螢幕
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    // 找totaltime更新顯示的時間格式為 mm:ss
    document.getElementById('totaltime').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 倒數計時
function startCountdown() {
    // setInterval單位是毫秒
    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("時間到，將觸發自動交卷。");
            submitAnswers();
        }
    }, 1000);
}

// 頁面載入後啟動倒數計時
window.addEventListener('load', () => {
    updateTimerDisplay();
    startCountdown();
});