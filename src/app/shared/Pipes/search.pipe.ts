import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../intrefeces";

@Pipe({name: 'SearchPipe'})

export class SearchPipe implements PipeTransform {
  transform(users: User[], search: string = ''): User[] {
  if (!search.trim()){
    return users
  }
  console.log(search)
  return users.filter(user =>{
    return user.name.toLowerCase().includes(search.toLowerCase())
  })
  }

}
