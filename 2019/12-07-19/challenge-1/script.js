/**
 * This is challenge 1 of 2019-12-07 of Advent of Code's 25-day challenge
 * See the readme for an explanation
 *
 * @author Timothy Beck <Dev@TimothyBeck.com>
 */
function bruteCircuit(arr) {
	let thruster = 0;
	let sequence = "";
	for(a = 0; a <= 5; a++) {
		for(b = 0; b <= 5; b++) {
			for(c = 0; c <= 5; c++) {
				for(d = 0; d <= 5; d++) {
					for(e = 0; e <= 5; e++) {
						if(a === b || a === c || a === d || a === e || b === c || b === d || b === e || c === d || c === e || d === e) {
							continue;
						}
						if(ampCircuit(arr, a, b, c, d, e) > thruster) {
							thruster = ampCircuit(arr, a, b, c, d, e);
							sequence = `Sequence: a = ${a}, b = ${b}, c = ${c}, d = ${d}, e = ${e}`;
						}
					}
				}
			}
		}
	}
	return `Thruster output: ${thruster} with ` + sequence;
}

function ampCircuit(arr, a, b, c, d, e) {
	let ins1 = arr;
	let ins2 = arr;
	let ins3 = arr;
	let ins4 = arr;
	let ins5 = arr;
	//const ampA = intcode(arr, a, 0);
	//const ampB = intcode(arr, b, intcode(arr, a, 0));
	//const ampC = intcode(arr, c, intcode(arr, b, intcode(arr, a, 0)));
	//const ampD = intcode(arr, d, intcode(arr, c, intcode(arr, b, intcode(arr, a, 0))));
	return ampE = intcode(ins1, e, intcode(ins2, d, intcode(ins3, c, intcode(ins4, b, intcode(ins5, a, 0)))));
}

function intcode(arr, phaseSetting, input) {
	//arr[1] = noun;
	//arr[2] = verb;
	let storedValue = phaseSetting;
	for(let i = 0; i <= arr.length - 1; i) {
		//console.log(i);
		//console.log(`i = ${i} and last value = ${Number(arr[i].toString().charAt(arr[i].toString().length - 1))}`);
		let opcodeValueOne = arr[arr[i + 1]];
		let opcodeValueTwo = arr[arr[i + 2]];
		let nextOpcode = i + 4;
		let intcodeComplete = arr.length;

		//opcode address is the last digit of the first item in each instruction
		let opcodeAddress = Number(arr[i].toString().slice(-2));
		//these variables store the instruction parameters
		let opParamHund = Number(arr[i].toString().charAt(arr[i].toString().length - 3));
		let opParamThou = Number(arr[i].toString().charAt(arr[i].toString().length - 4));

		if(opParamHund === 1) {
			opcodeValueOne = arr[i + 1];
		} else {
			opcodeValueOne = arr[arr[i + 1]];
		}
		if(opParamThou === 1) {
			opcodeValueTwo = arr[i + 2];
		} else {
			opcodeValueTwo = arr[arr[i + 2]];
		}

		//intcode logic - if opcode address is a value determining action, do said action
		//if address is one, add designated values in the next two positions or the array
		//apply the returned value to the position designated by the value of the 4th position in each intcode
		if(opcodeAddress === 1) {
			arr[arr[i + 3]] = opcodeValueOne + opcodeValueTwo;
			i = nextOpcode;
		} else if(opcodeAddress === 2) {
			arr[arr[i + 3]] = opcodeValueOne * opcodeValueTwo;
			i = nextOpcode;
			//console.log(`pointer: ${i}, address: ${opcodeAddress}, arr0 ${arr[0]}, arr2 ${arr[1]}, arr2 ${arr[2]}, arr03 ${arr[3]}, arr04 ${arr[4]}`);
		} else if(opcodeAddress === 99) {
			//if address is 99, intcode program is complete
			//console.log(`i = ${i} and arr[0] = ${arr[0]} at the end of the loop`);
			i = intcodeComplete;
			return `value at pos 0: ${arr[0]}`
		} else if(opcodeAddress === 3) {
			//outputs the stored value at the index of its parameter's value
			if(opParamHund === 1) {
				arr[i + 1] = storedValue;
			} else {
				arr[arr[i + 1]] = storedValue;
			}
			storedValue = input;
			i = i + 2;
		} else if(opcodeAddress === 4) {
			//logs the parameter
			if(opParamHund === 1) {
				return Number(arr[i + 1]);
			} else {
				return Number([arr[i + 1]]);
			}
		} else if(opcodeAddress === 5) {
			//logs the parameter
			if(opcodeValueOne !== 0) {
				i = opcodeValueTwo;
			} else {
				i = i + 3
			}
		} else if(opcodeAddress === 6) {
			//logs the parameter
			if(opcodeValueOne === 0) {
				i = opcodeValueTwo;
			} else {
				i = i + 3
			}
		} else if(opcodeAddress === 7) {
			//logs the parameter
			if(opcodeValueOne < opcodeValueTwo) {
				arr[arr[i + 3]] = 1;
				i = i + 4;
			} else {
				arr[arr[i + 3]] = 0;
				i = i + 4;
			}
		} else if(opcodeAddress === 8) {
			//logs the parameter
			if(opcodeValueOne === opcodeValueTwo) {
				arr[arr[i + 3]] = 1;
				i = i + 4;
			} else {
				arr[arr[i + 3]] = 0;
				i = i + 4;
			}
		} else if(opcodeAddress === 0) {
			i = i + 1;
		} else {
			return "Error invalid input";
		}
	}
}

let testInput = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
//ampCircuit(testInput, 0, 1,2,3,4);

console.log(intcode(testInput, 0, 0));
console.log(intcode(testInput, 1, 23));
//let puzzleInput = [3,8,1001,8,10,8,105,1,0,0,21,42,67,84,109,122,203,284,365,446,99999,3,9,1002,9,3,9,1001,9,5,9,102,4,9,9,1001,9,3,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,1001,9,4,9,102,3,9,9,101,3,9,9,4,9,99,3,9,101,5,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,102,5,9,9,101,5,9,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99];
//bruteCircuit(puzzleInput);