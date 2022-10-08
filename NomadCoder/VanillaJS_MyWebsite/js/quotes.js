const quotes = [
    {
        quote: "미래의 목표를 찾을 수 없어서 스스로 퇴행하고 있는 사람들은 과거를 회상하는 일에 몰두한다.",
        author: "죽음의 수용소에서 / 빅터 프랭클"
    },
    {
        quote: "고통스러운 감정은 우리가 그것을 명확하고 확실하게 묘사하는 바로 그 순간에 고통이기를 멈춘다.",
        author: "죽음의 수용소에서 / 빅터 프랭클"
    },
    {
        quote: "진정한 삶의 의미는 인간의 내면이나 그의 정신에서 찾을 것이 아니라 이 세상에서 찾아야 한다는 것이다.",
        author: "죽음의 수용소에서 / 빅터 프랭클"
    },
    {
        quote: "그런데 넌 그림한장 달랑 보고는 내 인생을 다 안다는 듯이 내 아픈 삶을 잔인하게 난도질했어.",
        author: "굿윌헌팅"
    },
    {
        quote: "Seize the day.",
        author: "죽은 시인의 사회"
    },
    {
        quote: "타인의 인정을 받는 것도 중요하지만 나의 신념이 독특하고 나 자신의 소유임을 믿어야 한다.\n" + 
        "비록 다른 사람들이 그것을 이상하다거나, 인기없다거나, 심지어 나쁘다고 생각하더라도.",
        author: "죽은 시인의 사회"
    },
    {
        quote: "당신은 당신이 반복한 행동의 결과다. 그러므로 탁월함은 습관에 달려있다.",
        author: "아리스토텔레스"
    },
    {
        quote: "사랑받고 싶다면 사랑하라, 그리고 사랑스럽게 행동하라.",
        author: "벤자민 프랭클린"
    },
    {
        quote: "순간의 안전을 얻기 위해 근본적인 자유를 포기하는 자는 자유도 안전도 보장받을 자격이 없다.",
        author: "벤자민 프랭클린"
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = randomQuote.quote;
author.innerText = "from " + randomQuote.author;