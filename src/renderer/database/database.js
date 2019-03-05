var mongoose = require('mongoose')

var jade = require('jade')
var dateParser = require('date-fns')
var locale = require('date-fns/locale/pt')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/betelife', { useMongoClient: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

var studentSchema = mongoose.Schema({
	name: String,
    birthdate: String,
    age: Number,
    shirt_size: String,
    father: String,
    mother: String,
    phone: String,
    address: String,
    lives_with: String,
    responsible: String,
    responsible_rg: String,
    job_father: String,
    job_mother: String,
    religion_father: String,
    religion_mother: String,
    school: String,
    grade: String,
    repeat_student: { type: Boolean, default: false },
    prev_student: { type: Boolean, default: false },
    health_issue: { type: Boolean, default: false },
    which_health_issue: String,
    use_medicine: { type: Boolean, default: false },
    which_medicine: String,
    fever_drug: String,
    family_reco: String,
    home_alone: { type: Boolean, default: false },
    who_takes_home: String,
    active: { type: Boolean, default: true },
    created_date: Date
})

var volunteerSchema = mongoose.Schema({
	name: String,
    birthdate: String,
    age: String,
    schooling: String,
    address: String,
    phone: String,
    whatsapp: String,
    email: String,
    rg: String,
    cpf: String,
    church: String,
    pastor: String,
    ministry: String,
    use_medicine: { type: Boolean, default: false },
    which_medicine: String,
    why_medicine: String,
    medical_monitored: { type: Boolean, default: false },
    why_medical_monitored: String,
    prev_volunteer: { type: Boolean, default: false },
    where_volunteer: String,
    experience_as_volunteer: String,
    what_is_volunteering: String,
    volunteering_principles: String,
    obedient: String,
    obedient_desc: String,
    must_not_do: String,
    expectations: String,
    active: { type: Boolean, default: true },
    created_date: Date
})

var Student = mongoose.model('StudentV2', studentSchema)
var Volunteer = mongoose.model('VolunteerV2', volunteerSchema)

export function howMany(callback) {
	Student.count().exec((err, studentsCount) => {
		console.log(studentsCount)

		let toReturn = {
			students: studentsCount
		}
		
		Volunteer.count().exec((err, volunteersCount) => {
			console.log(volunteersCount)
			
			toReturn.volunteers = volunteersCount
			callback(toReturn)
		})
	})
}

export function getStudents(callback) {
	Student.find().select('name phone mother age active').exec((err, stds) => {
		callback(stds)
	})
}

export function getStudent(id, callback) {
	let query = Student.findOne({ '_id': id })
	query.exec((err, std) => {
		callback(std)
	})
}

export function printStudent(id, callback) {
	Student.findOne({ '_id': id }).exec((err, student) => {
		let submitDate = dateParser.format(student.created_date, 'DD/MM/YYYY')
		let today = dateParser.format(Date.now(), 'DD [de] MMMM [de] YYYY', { locale: locale })
		
		let htlm = jade.renderFile(__static + '/printable/student.jade', { aluno: student, cadastro: submitDate, hoje: today})

		callback(htlm)
	})
}

export function printVolunteer(id, callback) {
	Volunteer.findOne({ '_id': id }).exec((err, volunteer) => {
		let submitDate = dateParser.format(volunteer.created_date, 'DD/MM/YYYY')
		let today = dateParser.format(Date.now(), 'DD [de] MMMM [de] YYYY', { locale: locale })
		
		let htlm = jade.renderFile(__static + '/printable/volunteer.jade', { voluntario: volunteer, cadastro: submitDate, hoje: today})

		callback(htlm)
	})
}

export function deleteStudent(id, callback) {
	Student.findByIdAndRemove(id).exec((err, done) => {
		callback(done)
	})
}

export function saveStudent(studentToSave, callback) {
	studentToSave.created_date = Date.now();
	let student = new Student(studentToSave)
	student.save((err, std) => {
		callback('saved into database')
	})
}

export function updateStudent(studentToUpdate, callback) {
	let query = Student.findOneAndUpdate({ '_id': studentToUpdate._id }, studentToUpdate)
	query.exec((err, done) => {
		callback('updated student')
	})
}

export function updateStudentStatus(info, callback) {
	let id = info.id
	let active = info.active

	let query = Student.findOneAndUpdate({ '_id': id }, { active: active })
	query.exec((err, done) => {
		callback(done)
	})
}

export function getVolunteer(id, callback) {
	let query = Volunteer.findOne({ '_id': id })
	
	query.exec((err, std) => {
		callback(std)
	})
}

export function updateVolunteerStatus(info, callback) {
	let id = info.id
	let active = info.active

	let query = Volunteer.findOneAndUpdate({ '_id': id }, { active: active })
	query.exec((err, done) => {
		callback(done)
	})
}

export function deleteVolunteer(id, callback) {
	Volunteer.findByIdAndRemove(id).exec((err, done) => {
		callback(done)
	})
}

export function getVolunteers(callback) {
	let query = Volunteer.find()
	query.select('name phone age active')

	query.exec((err, vlts) => {
		callback(vlts)
	})
}

export function saveVolunteer(info, callback) {
	let volunteer = new Volunteer(info)
	volunteer.save((err, vlt) => {
		callback('saved volunteer')
	})
}

export function updateVolunteer(info, callback) {
	let query = Volunteer.findOneAndUpdate({ '_id': info._id }, info)
	query.exec((err, done) => {
		callback('updated volunteer')
	})
}