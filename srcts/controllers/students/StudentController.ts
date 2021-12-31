import AddStudent from '../../application/use_cases/students/AddStudent'
import GetAllStudents from '../../application/use_cases/students/GetAllStudents'
import GetStudent from '../../application/use_cases/students/GetStudent'
import AddEnrollment from '../../application/use_cases/students/AddEnrollment'
import to from 'await-to-js'
import { BaseController } from '../BaseController'
import { get } from 'lodash'

class StudentController extends BaseController {
  private readonly studentRepository
  private readonly crmServices
  private readonly mapper

  constructor (dependencies) {
    super()
    this.studentRepository = get(dependencies, 'DatabaseService.studentRepository')
    this.crmServices = dependencies.CrmServices
    this.mapper = dependencies.mappers.StudentMap
  }

  async addNewStudent (req, res, next): Promise<void> {
    const AddStudentCommand = new AddStudent(this.studentRepository, this.crmServices)
    const { firstName, lastName, email } = req.body

    const response = await this.getResponseAndHandleError(AddStudentCommand.execute({ firstName, lastName, email }), next)

    return res.json(response)
  }

  async getAllStudents (req, res, next): Promise<void> {
    const GetAllStudentsQuery = new GetAllStudents(this.studentRepository)

    const response = await this.getResponseAndHandleError(GetAllStudentsQuery.execute(), next)

    return res.json(response.map(x => this.mapper.toDTO(x)))``
  }

  async getStudent (req, res, next): Promise<void> {
    const GetStudentQuery = new GetStudent(this.studentRepository)

    const response = await this.getResponseAndHandleError(GetStudentQuery.execute({ studentId: req.params.studentId }), next)

    return res.json(this.mapper.toDTO(response))
  }

  async addEnrollment (req, res, next): Promise<void> {
    const AddEnrollmentCommand = new AddEnrollment(this.studentRepository)

    const response = await this.getResponseAndHandleError(AddEnrollmentCommand.execute(req.params.studentId, req.body), next)

    return res.json(response)
  }
}

export default StudentController
