 type Blah = {
   hello: boolean;
 }

 export const testTsFunc = (isTrue: boolean, blah?: Blah) => {
   return isTrue === (blah && blah.hello);
 }
