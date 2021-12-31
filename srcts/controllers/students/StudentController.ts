import AddStudent from '../../application/use_cases/students/AddStudent'
import GetAllStudents from '../../application/use_cases/students/GetAllStudents'
import GetStudent from '../../application/use_cases/students/GetStudent'
import AddEnrollment from '../../application/use_cases/students/AddEnrollment'
import { BaseController } from '../BaseController'
import { get } from 'lodash'

class StudentController extends BaseController {
  private readonly studentRepository
  private readonly crmServices
  private readonly mapper

  constructor ({ databaseService, crmService, studentMap }) {
    super()
    this.studentRepository = get(databaseService, 'studentRepository')
    this.crmServices = crmService
    this.mapper = studentMap
  }

  async addNewStudent (req, res, next): Promise<void> {
    const AddStudentCommand = new AddStudent(this.studentRepository, this.crmServices)
    const { firstName, lastName, email } = req.body

    const response = await this.getResponseAndHandleError(AddStudentCommand.execute({ firstName, lastName, email }), next)

    return await this.formatResponse(res, response)
  }

  async getAllStudents (req, res, next): Promise<void> {
    const GetAllStudentsQuery = new GetAllStudents(this.studentRepository)

    const response = await this.getResponseAndHandleError(GetAllStudentsQuery.execute(), next)

    return await this.formatResponse(res, response.map(x => this.mapper.toDTO(x)), 'html')
  }

  async getStudent (req, res, next): Promise<void> {
    const GetStudentQuery = new GetStudent(this.studentRepository)

    const response = await this.getResponseAndHandleError(GetStudentQuery.execute({ studentId: req.params.studentId }), next)

    return await this.formatResponse(res, this.mapper.toDTO(response))
  }

  async addEnrollment (req, res, next): Promise<void> {
    const AddEnrollmentCommand = new AddEnrollment(this.studentRepository)

    const response = await this.getResponseAndHandleError(AddEnrollmentCommand.execute(req.params.studentId, req.body), next)

    return await this.formatResponse(res, response)
  }
}

export default StudentController
