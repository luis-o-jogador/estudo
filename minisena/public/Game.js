
const grid = document.querySelector('.grid');
const button = document.querySelector('.sortear_button');
const userAccountElement = document.querySelector('.user-account');
const usersAccountElement = document.querySelector('.users-account');
const userId = userAccountElement.getAttribute('data-user-id');
const userConta = userAccountElement.getAttribute('data-user-conta');
const usersConta = userAccountElement.getAttribute('data-users-conta');

/*
console.log("funfou ate aqui")
// Função para obter o token do cookie
const getTokenFromCookie = (cookieName) => {
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    return null;
};

// Função para decrementar a conta do usuário

const decrementUserAccount = async (token, amount) => {
    
    try {
        const response = await fetch('/decrement-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar a conta do usuário');
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const main = async () => {
    try {
        const token = getTokenFromCookie("token");
        console.log(token);
        if (!token) {
            throw new Error("Token não encontrado");
        }

        const amountToDecrement = 4.50;
        const updatedUser = await decrementUserAccount(token, amountToDecrement);
        console.log("Conta do usuário atualizada:", updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar a conta do usuário:", error.message);
    }
};

main();
*/

console.log(userId);
const updateAccount = async (userId,value) =>{
    const newValue = parseFloat(value);
        if (newValue) {
            try {
                const soma = userConta
                const response = await fetch('/update-account', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, value:newValue})
                });

                if (!response.ok) {
                    throw new Error('Error updating account');
                }

                const updatedUser = await response.json();

                // Atualize o valor na interface do usuário
                userAccountElement.textContent = `Conta: ${updatedUser.user.conta}`;
                //alert('Account updated successfully');
            } catch (error) {
                console.error('Error:', error);
                //alert('Failed to update account');
            }
        }
}



const cards = {
    
}
let firstCard = '';
let secondCard = '';
let thirdCard = '';
let fourthCard = '';
let fifthCard = '';
let sixthCard = '';

let sorteado = false;

const selectCard = ({target}) => {
    if (!target.parentNode.className.includes('selectCard')){
        //console.log(target.parentNode)
        if (firstCard == '') {
            target.parentNode.classList.add('selectCard');
            firstCard = target.parentNode;
            console.log("1 "+firstCard.firstChild.textContent);
        }else if ((secondCard == '')) {
            target.parentNode.classList.add('selectCard');
            secondCard = target.parentNode;
            console.log("2 "+secondCard.firstChild.textContent); 
        }else if ((thirdCard == '')) {
            target.parentNode.classList.add('selectCard');
            thirdCard = target.parentNode;
            console.log("3 "+thirdCard.firstChild.textContent); 
        }else if ((fourthCard == '')) {
            target.parentNode.classList.add('selectCard');
            fourthCard = target.parentNode;
            console.log("4 "+fourthCard.firstChild.textContent); 
        }else if ((fifthCard == '')) {
            target.parentNode.classList.add('selectCard');
            fifthCard = target.parentNode;
            console.log("5 "+fifthCard.firstChild.textContent); 
        }else if ((sixthCard == '')) {
            target.parentNode.classList.add('selectCard');
            sixthCard = target.parentNode;
            console.log("6 "+sixthCard.firstChild.textContent); 
        }else{
            console.log("numeros completos")
        }
    }
    else{
        
        if (firstCard == target.parentNode) {
            firstCard=''
            console.log("1=''");
        }else
        if (secondCard == target.parentNode) {
            secondCard=''
            console.log("2=''");
        }else
        if (thirdCard == target.parentNode) {
            thirdCard=''
            console.log("3=''");
        }else
        if (fourthCard == target.parentNode) {
            fourthCard=''
            console.log("4=''");
        }else
        if (fifthCard == target.parentNode) {
            fifthCard=''
            console.log("5=''");
        }else
        if (sixthCard == target.parentNode) {
            sixthCard=''
            console.log("6=''");
        }
        target.parentNode.classList.remove('selectCard');
    }

    if (firstCard!="" && secondCard!="" && thirdCard!="" && fourthCard!="" && fifthCard!="" && sixthCard!="") {
        button.disabled=false;
    }else {
        button.disabled=true;
    }
}

const createCard = (numberName) => {
    const card = document.createElement('div');
    //const active = document.createElement('div');
    const noactive = document.createElement('div');
    const correct = document.createElement('div');
    const nocorrect = document.createElement('div');
    const number = document.createElement('p');

    card.className='card';
    //active.className='face active';
    noactive.className='face noactive';
    correct.className='face correct';
    nocorrect.className='face nocorrect';
    number.className='number';

    //card.appendChild(active);
    card.appendChild(noactive);
    //card.appendChild(correct);
    //card.appendChild(nocorrect);
    grid.appendChild(card);
    noactive.appendChild(number);
    number.textContent=numberName+1;
    card.setAttribute('data_number',number.textContent)
    card.addEventListener('click', selectCard)
    
}

const loadGame = () => {
    for (var i=0;i<60;i++) {
        createCard(i);
    }
}

const numberSorteado = () => {
    if (sorteado) {
        grid.innerHTML="";
        button.textContent="Sortear";
        firstCard = '';
        secondCard = '';
        thirdCard = '';
        fourthCard = '';
        fifthCard = '';
        sixthCard = '';
        sorteado = false;
        active ="";
        noactive = "";
        correct = "";
        nocorrect = "";
        number = "";
        button.disabled=true;
        loadGame();
    }else {
        
        updateAccount(userId,Number(-4.5))

        sorteado=true;
        button.textContent="Repetir";
    let numeros = [
        {textContent: Math.floor(Math.random()*60)+1},
        {textContent: Math.floor(Math.random()*60)+1},
        {textContent: Math.floor(Math.random()*60)+1},
        {textContent: Math.floor(Math.random()*60)+1},
        {textContent: Math.floor(Math.random()*60)+1},
        {textContent: Math.floor(Math.random()*60)+1}
    ];
    /*
    let x1 = Math.floor(Math.random()*60)+1;
    let x2 = Math.floor(Math.random()*60)+1;
    let x3 = Math.floor(Math.random()*60)+1;
    let x4 = Math.floor(Math.random()*60)+1;
    let x5 = Math.floor(Math.random()*60)+1;
    let x6 = Math.floor(Math.random()*60)+1;
    */

    //numeros[0].textContent=60;

    const x1=numeros[0];
    const x2=numeros[1];
    const x3=numeros[2];
    const x4=numeros[3];
    const x5=numeros[4];
    const x6=numeros[5];
    while (x1==x2 | x1==x3 | x1==x4 | x1==x5 | x1==x6 ) {
        x1 = Math.floor(Math.random()*60)+1;
        numeros[0]=x1
    }
    while (x2==x3 | x2==x4 | x2==x5 | x2==x6 ) {
        x2 = Math.floor(Math.random()*60)+1;
        numeros[1]=x2
    }
    while (x3==x4 | x3==x5 | x3==x6 ) {
        x3 = Math.floor(Math.random()*60)+1;
        numeros[2]=x3
    }
    while (x4==x5 | x4==x6 ) {
        x4 = Math.floor(Math.random()*60)+1;
        numeros[3]=x4
    }
    while (x5==x6 ) {
        x5 = Math.floor(Math.random()*60)+1;
        numeros[4]=x5
    }
    for(i=0;i<numeros.length;i++) {
        
        const card = document.querySelectorAll('.card');
        card[Math.floor(numeros[i].textContent-1)].classList.add('correct');
        console.log(card[Math.floor(numeros[i].textContent-1)])
        const icon = "c";
        switch(numeros[i].textContent) {
            case Math.floor(firstCard.textContent):
                firstCard.firstChild.firstChild.textContent=icon;
                firstCard.classList.add("correct");
                console.log('acertou')
            break;
            case Math.floor(secondCard.textContent):
                secondCard.classList.add("correct");
                secondCard.firstChild.firstChild.textContent=icon;
                console.log('acertou')
            break;
            case Math.floor(thirdCard.textContent):
                thirdCard.classList.add("correct");
                thirdCard.firstChild.firstChild.textContent=icon;
                console.log('acertou')
            break;
            case Math.floor(fourthCard.textContent):
                fourthCard.classList.add("correct");
                fourthCard.firstChild.firstChild.textContent=icon;
                console.log('acertou')
            break;
            case Math.floor(fifthCard.textContent):
                fifthCard.classList.add("correct");
                fifthCard.firstChild.firstChild.textContent=icon;
                console.log('acertou')
            break;
            case Math.floor(sixthCard.textContent):
                sixthCard.classList.add("correct");
                sixthCard.firstChild.firstChild.textContent=icon;
                console.log('acertou')
            break;
        }
    }

    /*
    x1=numeros.x1;
    x2=numeros.x2;
    x3=numeros.x3;
    x4=numeros.x4;
    x5=numeros.x5;
    x6=numeros.x6;
    while (x1==x2 | x1==x3 | x1==x4 | x1==x5 | x1==x6 ) {
        x1 = Math.floor(Math.random()*60)+1;
        
    }
    while (x2==x3 | x2==x4 | x2==x5 | x2==x6 ) {
        x2 = Math.floor(Math.random()*60)+1;
        
    }
    while (x3==x4 | x3==x5 | x3==x6 ) {
        x3 = Math.floor(Math.random()*60)+1;
        
    }
    while (x4==x5 | x4==x6 ) {
        x4 = Math.floor(Math.random()*60)+1;
        
    }
    while (x5==x6 ) {
        x5 = Math.floor(Math.random()*60)+1;
    }

    */
    console.log(numeros[0].textContent);
    console.log(numeros[1].textContent);
    console.log(numeros[2].textContent);
    console.log(numeros[3].textContent);
    console.log(numeros[4].textContent);
    console.log(numeros[5].textContent);

    console.log(sixthCard.textContent);
    }
}

button.addEventListener('click', numberSorteado)

loadGame();