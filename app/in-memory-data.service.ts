import { InMemoryDbService } from 'angular-in-memory-web-api';



export class HeroData implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice', specialPower: 'Is unaturally nice' },
      {id: 12, name: 'Narco', specialPower: 'pollo'  },
      {id: 13, name: 'Bombasto', specialPower: 'blow up things' },
      {id: 14, name: 'Celeritas', specialPower: 'spanish' },
      {id: 15, name: 'Magneta', specialPower: 'attract metal' },
      {id: 16, name: 'RubberMan', specialPower: 'Can control electricity' },
      {id: 17, name: 'Dynama', specialPower: 'Is awesome' },
      {id: 18, name: 'Dr IQ', specialPower: 'extremely smart' },
      {id: 19, name: 'Magma', specialPower: 'shoots lava' },
      {id: 20, name: 'Tornado', specialPower: 'Creates tornados' }
    ];

    return {heroes};

  }; 
}

 export class UserData implements InMemoryDbService {
  createDb() {
    let users = [
   {name: 'conner', username: 'unfaded', password: 'conner12', id: 1},
   {name: 'new', username: 'none', password: 'to', id: 2}
   ];

   return {users};
  };
}


