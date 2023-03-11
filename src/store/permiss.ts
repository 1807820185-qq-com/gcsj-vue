//权限控制，暂时注释掉
import { defineStore } from 'pinia';
//
// interface ObjectList {
// 	[key: string]: string[];
// }
//
// export const usePermissStore = defineStore('permiss', {
// 	state: () => {
// 		return {
// 			// key: keys ? JSON.parse(keys) : <string[]>[],
// 			key:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
// 			defaultList: <ObjectList>{
// 				admin: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
// 				user: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
// 			}
// 		};
// 	},
// 	actions: {
// 		handleSet(val: string[]) {
// 			// @ts-ignore
// 			this.key = val;
// 			console.log(val)
// 			localStorage.setItem("ms_keys",JSON.stringify(val))
// 		}
// 	}
// });
