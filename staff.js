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

var selectedStaffs = [];

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
function init() {
    if (localStorage.getItem(staff_db) == null) {
        staffs = [
            new Staff(1, "Khoa Nguyễn", "https://i.pravatar.cc/150?img=3", "CEO", "2011-03-05", 5, "Business Analytic"),
            new Staff(2, "Phụng Phạm", "https://i.pravatar.cc/150?img=13", "Head of SMM", "2011-03-05", 5, "Management"),
            new Staff(3, "Thủy Đặng", "https://i.pravatar.cc/150?img=10", "PM", "2011-03-05", 5, "Photoshop"),
            new Staff(4, "Duy Trần", "https://i.pravatar.cc/150?img=7", "Designer", "2011-03-05", 5, "QA"),
        ]
        localStorage.setItem(staff_db, JSON.stringify(staffs))
    }
    else {
        staffs = JSON.parse(localStorage.getItem(staff_db));
    }
}

function renderStaff(checked) {
    let htmls = staffs.map(function (staff) {
        return `
                <tr>
                    <td>
                        <input onchange="selectStafff(${staff.id})" type="checkbox" ${checked ? "checked" : ""}>
                    </td>
                    <td>
                        <div class="avatar-fullname">
                            <img class="avatar" src="${staff.avatar}" alt="">
                            <span>${staff.fullname}</span>
                        </div>
                    </td>
                    <td>${staff.position}</td>
                    <td>${staff.dob}</td>
                    <td>${staff.experience}</td>
                    <td>${staff.skill}</td>
                    <td>
                        <i class="fa-solid fa-user-pen" onclick="editStaff(${staff.id})"></i>
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
    renderStaff(false);
    resetCreateForm();
}

function resetCreateForm() {
    document.querySelector('#staffId').value = 0;
    document.querySelector('#fullname').value = "";
    document.querySelector('#avatar').value = "";
    document.querySelector('#dob').value = "";
    document.querySelector('#experience').value = "";
    document.querySelector('#reviewAvatar').src = "images/noavatar.jpg";

    renderPosition();
    renderSkills();

    document.querySelector('.btn-success').classList.remove('d-none');
    document.querySelector('.btn-warning').classList.add('d-none');
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

function selectAllStaff() {
    let ckbStaffs = document.querySelector('#ckbStaffs');
    renderStaff(ckbStaffs.checked);
    if (ckbStaffs.checked) {
        selectedStaffs = staffs.map(function (staff) {
            return staff.id;
        })
    }
    else {
        selectedStaffs = [];
    }
    console.log(selectedStaffs);
}

function selectStafff(staffId) {
    if (selectedStaffs.includes(staffId)) {
        selectedStaffs = selectedStaffs.filter(function (id) {
            return id != staffId;
        })
    }
    else {
        selectedStaffs.push(staffId);
    }
    document.querySelector('#ckbStaffs').checked = false;
    console.log(selectedStaffs);
}


function deleteStaffs() {
    if (selectedStaffs.length == 0) {
        alert("Please select a staff to remove!")
    }
    else {
        let confirmed = window.confirm("Are you sure to remove staff(s)?");
        if (confirmed) {
            for (let id of selectedStaffs) {
                staffs = staffs.filter(function (staff) {
                    return staff.id != id;
                })
            }
            localStorage.setItem(staff_db, JSON.stringify(staffs));
            renderStaff(false);
            selectedStaffs = [];
            document.querySelector('#ckbStaffs').checked = false;
        }
    }
}

function editStaff(staffId) {
    let staff = staffs.find(function (staff) {
        return staff.id == staffId;
    })

    document.querySelector('#staffId').value = staff.id;
    document.querySelector('#fullname').value = staff.fullname;
    document.querySelector('#avatar').value = staff.avatar;
    document.querySelector('#dob').value = staff.dob;
    document.querySelector('#experience').value = staff.experience;
    document.querySelector('#reviewAvatar').src = staff.avatar;

    document.querySelector('#position').value = staff.position;
    document.querySelector('#skills').value = staff.skill;

    document.querySelector('.btn-success').classList.add('d-none');
    document.querySelector('.btn-warning').classList.remove('d-none');
}

function updateStaff() {
    let staffId = document.querySelector('#staffId').value;
    let staff = staffs.find(function (staff) {
        return staff.id == staffId;
    })

    staff.fullname = document.querySelector('#fullname').value;
    staff.avatar = document.querySelector('#avatar').value;
    staff.position = document.querySelector('#position').value;
    staff.dob = document.querySelector('#dob').value;
    staff.experience = document.querySelector('#experience').value;
    staff.skill = document.querySelector('#skills').value;

    localStorage.setItem(staff_db, JSON.stringify(staffs));
    renderStaff(false);
    resetCreateForm();
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function sort(direction) {
    if (direction == 'asc') {
        staffs.sort(function (staff_1, staff_2) {
            return staff_1.id - staff_2.id;
        })
        document.querySelector('#sort_asc').classList.add('sort-active');
        document.querySelector('#sort_desc').classList.remove('sort-active');
    }
    else {
        staffs.sort(function (staff_1, staff_2) {
            return staff_2.id - staff_1.id;
        })
        document.querySelector('#sort_asc').classList.remove('sort-active');
        document.querySelector('#sort_desc').classList.add('sort-active');
    }
    renderStaff(false);
}

function displayCreateArea(element) {
    document.querySelector('.create-staff').classList.toggle('d-none');
    if (element.value == "Show") {
        element.value = "Hide";
    } else {
        element.value = "Show";
    }
}

function ready() {
    init();
    renderPosition();
    renderSkills();
    sort('desc');
    renderStaff(false);
}

ready();