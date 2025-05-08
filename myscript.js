const totalQuestions = 100; // 題目數量
const numberlength = totalQuestions.toString().length; // 題號長度
const questionTable = document.getElementById('questionTable');
const container = document.getElementById('jumpLinks');

var checkAnsisShow = false; // 題目總覽是否顯示
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
    row.id = `q${i}`;

    const numberCell = document.createElement('td');
    numberCell.textContent = i;

    const questionCell = document.createElement('td');
    questionCell.innerHTML = `
        <h4>Lorem ipsum dolor sit amet consecte ${i}</h4><br>
        <input type="radio" name="q${i}"> a. 選項 A<br>
        <input type="radio" name="q${i}"> b. 選項 B<br>
        <input type="radio" name="q${i}"> c. 選項 C<br>
        <input type="radio" name="q${i}"> d. 選項 D
    `;


    row.appendChild(numberCell);
    row.appendChild(questionCell);
    questionTable.appendChild(row);

    // 跳轉連結
    const link = document.createElement('a');
    link.href = `#q${i}`;
    link.textContent = `${i.toString().padStart(numberlength, '0')}`;
    link.style.display = 'block';
    link.style.margin = '5px 0';
    link.style.color = 'red';
    link.id = `link-q${i}`;
    container.appendChild(link);

    // 監控選項
    const inputs = questionCell.querySelectorAll(`input[name="q${i}"]`);
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            const linkElement = document.getElementById(`link-q${i}`);
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
