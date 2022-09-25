import { ApiProperty } from "@nestjs/swagger";
export class FriendRequest{
	@ApiProperty()    
    userName : string
	@ApiProperty()
    friendId : number
	@ApiProperty()
    imgUrl : string

}