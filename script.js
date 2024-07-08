const gradation = {
    20: "satisfactory",
    55: "good",
    85: "very-good",
    100: "excellent"
};

const users = [
    {
        name: "Jack Smith",
        age: 23,
        img: "JackSmith",
        role: "student",
        courses: [
            {
                title: "Front-end Pro",
                mark: 20
            },
            {
                title: "Java Enterprise",
                mark: 100
            }
        ]
    },
    {
        name: "Amal Smith",
        age: 20,
        img: "AmalSmith",
        role: "student"
    },
    {
        name: "Noah Smith",
        age: 43,
        img: "NoahSmith",
        role: "student",
        courses: [
            {
                title: "Front-end Pro",
                mark: 50
            }
        ]
    },
    {
        name: "Charlie Smith",
        age: 18,
        img: "CharlieSmith",
        role: "student",
        courses: [
            {
                title: "Front-end Pro",
                mark: 75
            },
            {
                title: "Java Enterprise",
                mark: 23
            }]
    },
    {
        name: "Emily Smith",
        age: 30,
        img: "EmilySmith",
        role: "admin",
        courses: [
            {
                title: "Front-end Pro",
                score: 10,
                lector: "Leo Smith"
            },
            {
                title: "Java Enterprise",
                score: 50,
                lector: "David Smith"
            },
            {
                title: "QA",
                score: 75,
                lector: "Emilie Smith"
            }]
    },
    {
        name: "Leo Smith",
        age: 253,
        img: "LeoSmith",
        role: "lector",
        courses: [
            {
                title: "Front-end Pro",
                score: 78,
                studentsScore: 79
            },
            {
                title: "Java Enterprise",
                score: 85,
                studentsScore: 85
            }
        ]
    }
];

class User {
    constructor(name, age, img, role, courses = []) {
        this.name = name;
        this.age = age;
        this.img = img;
        this.role = role;
        this.courses = courses;
    }

    renderCourses() {
        return this.courses.map(course => {
            const markOrScore = course.mark !== undefined ? course.mark : course.score;
            const gradationClass = gradation[markOrScore];
            return `
                <p class="user__courses--course ${this.role}">
                    ${course.title}
                    <span class="${gradationClass}">
                        ${gradationClass}
                    </span>
                </p>
            `;
        }).join('');
    }

    render() {
        const coursesHTML = this.courses.length ? `<div class="user__courses">${this.renderCourses()}</div>` : '';

        return `
            <div class="user">
                <div class="user__info">
                    <div class="user__info--data">
                        <img src="images/users/${this.img}.png" alt="${this.name}" height="50">
                        <div class="user__naming">
                            <p>Name: <b>${this.name}</b></p>
                            <p>Age: <b>${this.age}</b></p>
                        </div>
                    </div>
                    <div class="user__info--role ${this.role}">
                        <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
                        <p>${this.role}</p>
                    </div>
                </div>
                ${coursesHTML}
            </div>
        `;
    }
}

class Student extends User {
    renderCourses() {
        return this.courses.map(course => `
            <p class="user__courses--course ${this.role}">
                ${course.title}
                <span class="${gradation[course.mark]}">${gradation[course.mark]}</span>
            </p>
        `).join('');
    }
}

class Admin extends User {
    renderCourses() {
        return this.courses.map(course => `
            <div class="user__courses--course ${this.role}">
                <p>Title: <b>${course.title}</b></p>
                <p>Admin's score: <span class="${gradation[course.score]}">${gradation[course.score]}</span></p>
                <p>Lector: <b>${course.lector}</b></p>
            </div>
        `).join('');
    }
}

class Lector extends User {
    renderCourses() {
        return this.courses.map(course => `
            <div class="user__courses--course ${this.role}">
                <p>Title: <b>${course.title}</b></p>
                <p>Lector's score: <span class="${gradation[course.score]}">${gradation[course.score]}</span></p>
                <p>Average student's score: <span class="${gradation[course.studentsScore]}">${gradation[course.studentsScore]}</span></p>
            </div>
        `).join('');
    }
}

function generateUser(user) {
    switch (user.role) {
        case 'student':
            return new Student(user.name, user.age, user.img, user.role, user.courses);
        case 'admin':
            return new Admin(user.name, user.age, user.img, user.role, user.courses);
        case 'lector':
            return new Lector(user.name, user.age, user.img, user.role, user.courses);
        default:
            return new User(user.name, user.age, user.img, user.role, user.courses);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.querySelector('.users');
    users.forEach(user => {
        const userInstance = generateUser(user);
        usersContainer.innerHTML += userInstance.render();
    });
})