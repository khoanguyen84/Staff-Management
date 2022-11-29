class Staff {
    constructor(id, fullname, avatar, position, dob, exp, skill) {
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.position = position;
        this.dob = dob;
        this.experience = exp;
        this.skill = skill;
    }
}

var staffs = [];

var positions = [
    "CEO",
    "Head of SMM",
    "PM",
    "Designer"
]

var skills = [
    "Business Analytic",
    "Marketing Stategy",
    "Q/A",
    "Photoshop",
    "Management"
]

const staff_db = "staff_db";
function init(){
    if(localStorage.getItem(staff_db) == null){
        staffs = [
            new Staff(1, "Khoa Nguyễn", "https://i.pravatar.cc/150?img=3", "CEO", "2011-03-05", 5, "Business Analytic"),
            new Staff(2, "Phụng Phạm", "https://i.pravatar.cc/150?img=13", "Head of SMM", "2011-03-05", 5, "Management"),
            new Staff(3, "Thủy Đặng", "https://i.pravatar.cc/150?img=10", "PM", "2011-03-05", 5, "Photoshop"),
            new Staff(4, "Duy Trần", "https://i.pravatar.cc/150?img=7", "Designer", "2011-03-05", 5, "QA"),
        ]
        localStorage.setItem(staff_db, JSON.stringify(staffs))
    }
    else{
        staffs = JSON.parse(localStorage.getItem(staff_db));
    }
}

function renderStaff() {
    let htmls = staffs.map(function (staf) {
        return `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>
                        <div class="avatar-fullname">
                            <img class="avatar" src="${staf.avatar}" alt="">
                            <span>${staf.fullname}</span>
                        </div>
                    </td>
                    <td>${staf.position}</td>
                    <td>${staf.dob}</td>
                    <td>${staf.experience}</td>
                    <td>${staf.skill}</td>
                    <td>
                        <i class="fa-solid fa-user-pen"></i>
                    </td>
                </tr>`
    })

    document.querySelector('.table>tbody').innerHTML = htmls.join("");
}

function renderPosition() {
    let htmls = positions.map(function (pos) {
        return `<option value="${pos}">${pos}</option>`
    })

    document.querySelector('#position').innerHTML = htmls.join("")
}


function renderSkills() {
    let htmls = skills.map(function (skill) {
        return `<option value="${skill}">${skill}</option>`
    })
    document.querySelector('#skills').innerHTML = htmls.join('')
}


function changeAvatar() {
    let avatarUrl = document.querySelector('#avatar').value;
    if (avatarUrl != null && avatarUrl != "") {
        document.querySelector('#reviewAvatar').src = avatarUrl;
    }
    else {
        document.querySelector('#reviewAvatar').src = "images/noavatar.jpg"
    }
}


function createStaff() {
    let fullname = document.querySelector('#fullname').value;
    let avatar = document.querySelector('#avatar').value;
    let position = document.querySelector('#position').value;
    let dob = document.querySelector('#dob').value;
    let experience = document.querySelector('#experience').value;
    let skills = document.querySelector('#skills').value;
    let id = getMaxId() + 1;

    staffs.push(new Staff(id, fullname, avatar, position, dob, experience, skills));
    localStorage.setItem(staff_db, JSON.stringify(staffs));
    renderStaff();
    resetCreateForm();
}

function resetCreateForm(){
    document.querySelector('#fullname').value = "";
    document.querySelector('#avatar').value = "";
    document.querySelector('#dob').value = "";
    document.querySelector('#experience').value = "";
    document.querySelector('#reviewAvatar').src = "images/noavatar.jpg";
    
    renderPosition();
    renderSkills();
}
function getMaxId() {
    let max = 0;
    for (let i = 0; i < staffs.length; i++) {
        if (staffs[i].id > max) {
            max = staffs[i].id
        }
    }
    return max;
}
function ready() {
    init();
    renderPosition();
    renderSkills();
    renderStaff();
}

ready();