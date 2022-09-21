import { ApiProperty } from "@nestjs/swagger"

export class Achievement {
	@ApiProperty()    
    name : string
	@ApiProperty()
    achieved : boolean
	@ApiProperty()
    description : string
	@ApiProperty()
    imgUrl : string
}