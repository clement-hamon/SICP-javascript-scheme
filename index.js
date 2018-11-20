function remainder(a, b){
    return Math.abs(a - b);
}

function gcd(a, b){
    if( b === 0){
        return a
    } else {
        return gcd(b, remainder(a, b));
    }
}

function cube(x) {
    return x * x * x;
}

function expt1(b, n){
    if (n === 0) { return 1 };
    return b * expt1(b, n - 1);
}


function expt2(b, n){
    return expt2Iter(b, n, 1)
}

function expt2Iter(b, n , counter){
    if(n === 0) {
        return counter;
    }
    return expt2Iter(b, n - 1, counter * b);
}

function expt3(b, n){
    if( n === 0 ){ return 1}
    return (n % 2 === 0) ?
        Math.pow(expt3(b, n / 2), 2)
        :
        b * expt3(b, n - 1);
}

function expt4(b, n){
    return expt4Iter(b, n, 1);
}

function expt4Iter(b, n, counter){
    //console.trace();
    //console.log(b, n, counter);
    if( n === 0 ){ return counter}
    return (n % 2 === 0) ?
        expt4Iter(Math.pow(b, 2), n / 2, counter)
        :
        expt4Iter(b, n - 1, b * counter);
}

// ex 1.17 - 1.18 --------------------------------------------

function mult(a, b){
    return multIter(a, b, 0)
}

function multIter(a, b, sum){
    if( b === 1 ){ return a + sum }

    return (b % 2 === 0)
        ?
        multIter(a + a, b / 2, sum)
        :
        multIter(a, b - 1, sum + a);
}

// ex 1.19 --------------------------------------------

function fib(n){
    return fibIter(1, 0, 0, 1, n);
}

function fibIter(a, b, p, q, count){
    if( count === 0 ){
        return b;
    }
    else if (count % 2 === 0){
        return fibIter(
            a,
            b,
            Math.pow(p,2) + Math.pow(q,2),
            (2 * p * q) + Math.pow(q,2),
            count / 2
        )
    } else {
        return fibIter(
            (b * q) + (a * q) + (a * p),
            (b * p) + (a * q),
            p,
            q,
            count - 1
        )
    }
}

function hanoi(n,src,aux,dest) {
    move(n,src,aux,dest);
};

function move(disc,src,aux,dest){
    if( disc === 1) {
        console.log("move disc " + disc + "from " + src + " to " + dest);
    } else {
        move(disc-1, src, dest, aux);
        console.log("move disc " + disc + "from " + src + " to " + dest);
        move(disc-1, aux, src, dest);
    }
}

///////////////////////// FERMAT TEST

function divides(divisor, n){
    return (n % divisor) === 0;
}

function next(n){
    return (n === 2) ? 3 : n + 2;
}

function findDivisor(n, testDivisor){
    if(Math.pow(testDivisor,2) > n) {
        return n;
    }
    else if( divides(testDivisor, n)){
        return testDivisor
    }
    else {
        return findDivisor(n, next(testDivisor));
    }
}

function getSmallestDivisor(n){
    return findDivisor(n, 2);
}

function isPrime(n){
    return ( getSmallestDivisor(n) === n);
}

function startPrimeTest(n){
    console.time(n);
    if(isPrime(n)){
        console.timeEnd(n);
    }
}

function find3SmallestPrimeAfter(n){
    getConsecutivePrime(n + 1, 3, 0);
}

function getConsecutivePrime(n, limit, count){

    if(limit === count) {
        console.log(n, n - 2, n - 4);
    } else {
        if(isPrime(n)){
            console.log(n + " is prime");
            getConsecutivePrime(n + 2, limit, count + 1)
        } else {
            getConsecutivePrime(n + 2, limit, count)
        }
    }
}

function sumInt(a, b){
    if(a > b){
        return 0
    } else {
        return a + sumInt(a+1, b);
    }
}

function sumSquareInt(a, b){
    if(a > b){
        return 0
    } else {
        return Math.pow(a, 2) + sumSquareInt(a+1, b);
    }
}

// function sum(func, next, a, b){
//     if(a > b){
//         return 0
//     } else {
//         return func(a) + sum(func, next, next(a), b);
//     }
// }

function sqrt(x){
    return fixedPoint(
//        (y) => (y + (x / y)) / 2,
        averageDamp((y) => (x / y)),
        1
    )
}

function averageDamp(func){
    return (x) => (func(x) + x) / 2
}

const tolerance = 0.00001;

function closeEnuf(oldV, newV){
    return Math.abs(oldV - newV) <= tolerance;
}

function fixedPoint(func, i){

    function iter(oldV, newV){
        return closeEnuf(oldV, newV) ? newV : iter(newV, func(newV));
    }

    return iter(i, func(i));
}


/*
Square root by newton's method

No need , use Math.sqrt()

The newton's method is an approximation algorithm to find th root of a function.
Why are we interested in finding the root of a function. f(x) = 0
    we have to find a function that will return 0 if we passed in the square root of x
    f(x) = 0


f(x) = 0

let's define a function that equal to 0 when the sqrt of x is passed in
we look for the sqrt of x

f(y) = x - (y)^2

ex:
x = 4

f(2) = 4 - 2^2
f(2) = 4 - 4
f(2) = 0

we want to find the root (zero) of this function

Algorithm => x+1 = f

derivative = (f(x + dx) - f(x)) / dx

 */

function sqrtNewton(x){
    return newton( (y) => x - Math.pow(y, 2), 1);
}

function newton(func, guess){
    const deriv = derivative(func);
    return fixedPoint( (x) => guess - (func(guess) / deriv(guess)));
}

function derivative(func){
    const dx = .00001;
    return (x) =>  (func(x + dx) - func(x)) / dx;
}

const dx = .001;

function integral(func, a, b){
    const addDx = (x) => x + dx;

    return sum(func, addDx, (a + dx / 2), b ) * dx;
}


function simpsonsIntegral(func, a, b, n){
    const h = (b - a) / n;
    const y = (k) => func(a + k * h);
    const term = (k) => {
        const mult = (k === 0 || k === n) ? 1 : (k % 2 === 0) ? 2 : 4;
        return mult * y(k);
    };
    const inc = (x) => x + 1;
    return (h/3 * sum(term, inc, 0, n));
}
//  sum(func, next, a, b)


// exercise 1.30 sum iterative
// function sum(term, next, a, b){
//     function iter(a, result){
//         if(a > b){
//             return result;
//         } else {
//             return iter(next(a), result + term(a))
//         }
//     }
//     return iter(a, 0);
// }

// exercise 1.31 product iterative
// function product(term, next, a, b){
//     function iter(a, result){
//         if(a > b){
//             return result;
//         } else {
//             return iter(next(a), result * term(a))
//         }
//     }
//     return iter(a, 1);
// }

function factorialP(a){
    return product(
        (x) => x,
        (x) => x + 1,
        1,
        a)
}

function pi(precision){
    return 2 * product(
        (x) => (4 * Math.pow(x, 2)) / ((4 * Math.pow(x, 2)) - 1),
        (x) => x + 1,
        1,
        precision);
}

// exercise 1.32 accumulate

function accumulate(combiner, nullValue, term, a, next, b){
    function iter(a, result){
        if(a > b){
            return result;
        } else {
            return iter(next(a), combiner(result, term(a)))
        }
    }
    return iter(a, nullValue);
}

function sum(term, next, a, b){
    return accumulate(
        (x, y) => y + x,
        0,
        term,
        a,
        next,
        b);
}

function product(term, next, a, b){
    return accumulate(
        (x, y) => y * x,
        1,
        term,
        a,
        next,
        b);
}

// exercise 1.33
function filteredAccumulate(filter, combiner, nullValue, term, a, next, b){
    function iter(a, result){
        if(a > b){
            return result;
        } else if(filter(a)) {
            return iter(next(a), combiner(result, term(a) ));
        } else{
            return iter(next(a), result);
        }
    }
    return iter(a, nullValue);
}

function sumSquaresPrime(a,b){
    return filteredAccumulate(
        (x) => isPrime(x),
        (a, b) => a + b,
        0,
        (x) => Math.pow(x, 2),
        a,
        (x) => x + 1,
        b
    )
}

function productPosIntLessThanAndPrime(n){
    function coprime(a){
        return gcd(a, n) === 1
    }

    return filteredAccumulate(
        (x) => coprime(x),
        (a, b) => a * b,
        1,
        (x) => x,
        1,
        (x) => x + 1,
        n
    )
}

function average(a, b){
    return (a + b) / 2;
}

function search(f, negPoint, posPoint){
    let midpoint = average(negPoint, posPoint);
    if(closeEnuf(negPoint, posPoint)){
        return midpoint;
    } else {
        let testvalue = f(midpoint);
        if(testvalue > 0){
            return search(f, negPoint, midpoint);
        } else if (testvalue < 0){
            return search(f, negPoint, posPoint);
        } else {
            return midpoint;
        }
    }
}


function halfIntervalMethod(f, a, b){
    let aValue = f(a);
    let bValue = f(b);

    if( (aValue < 0) && (bValue > 0) ){
        return search(f, a, b);
    } else if( (bValue < 0) && (aValue > 0) ){
        return search(f, b, a);
    } else {
        throw Error("Value should be of opposite sign");
    }
}

function fixedPoint2(f, firstGuess){
    function tryGuess(guess){
        console.log(guess);
        let next = f(guess);
        if(closeEnuf(guess, next)){
            return next;
        } else {
            return tryGuess(next)
        }
    }
    return tryGuess(firstGuess);
}


// exercise 1.37 ----------------------------------------

function contFrac(n, d, k){
    function frac(i){
        if(k <= i){
            return n(i) / d(i);
        }
        return n(i) / (d(i) + frac(i + 1));
    }
    return frac(1);
}

function contFracIter(n, d, k){
    function iter(res, i){
        if(0 === i){
            return res;
        }
        return iter(n(i) / (d(i) + res), i - 1);
    }
    return iter(n(k) / d(k), k - 1);
}

// exercise 1.38 ----------------------------------------

function de(i){
    if(i === 1 ){
        return 1;
    }
    return (i + 1) % 3 === 0 ? 2/3 * (i+1) : 1 ;
}


const e = 2 + contFracIter((x) => 1, de, 10);

// chap 1.3.4 ----------------------------------------

function deriv(f){
    return (x) => ( f(x + dx) - f(x) ) / dx
}

function newtonTransform(f){
    return (x) => (x - ( f(x) / deriv(f)(x) ));
}

function newtonMethod(f, guess){
    return fixedPoint( newtonTransform(f) , guess);
}

function sqrt3(x){
    return newtonMethod( (y) => Math.pow(y, 2) - x , 1.0);
}

function fixedPointTransformation(f, transform, guess){
    return fixedPoint( transform(f) , guess);
}

function sqrt4(x){
    return fixedPointTransformation((y) => Math.pow(y, 2) - x , newtonTransform , 1.0);
}

// ex 1.40 ----------------------------------------

function cubic(a, b, c){
    return (x) => (x * x * x) + a * (x * x) + b * x + c;
}

// ex 1.41 ----------------------------------------

function double(f){
    return (x) => f( f(x) );
}

// ex 1.42 ----------------------------------------

function compose(f, g, x){
    return f( g(x) );
}

// ex 1.43 ----------------------------------------

function repeat(f, i){

    function iter(g, n, x){
        console.log(n);
        if(n === 1){
            return g(x);
        }
        return g(iter(g, n-1, x));
    }

    return (x) => iter(f, i, x);
}

// ex 1.44 ----------------------------------------

function smooth(f){
    return (x) => (f(x - dx) + f(x) + f(x + dx)) / 3;
}

function nthSmooth(f, n){
    return repeat(smooth, n)(f);
}

// data abstration --------------------------------------------

function makeRat(n, d){

    if(d < 0){
        d *= -1;
        n *= -1;
    }

    const g = gcd(n, d)
    if( g !== 1){
        n /= g
        d /= g
    }
    return {numer: n, denom: d}
}

function addRat(a, b){
    return makeRat(
        a.numer * b.denom + b.numer * a.denom,
        a.denom * b.denom
    )
}

function subRat(a, b){
    return makeRat(
        a.numer * b.denom - b.numer * a.denom,
        a.denom * b.denom
    )
}

function mulRat(a, b){
    return makeRat(
        a.numer * b.numer,
        a.denom * b.denom
    )
}

function divRat(a, b){
    return makeRat(
        a.numer * b.denom,
        a.denom * b.denom
    )
}

function equalRat(a, b){
    return a.numer * b.denom === b.numer * a.denom
}


////////////////////////////////////////////////////////////// ex 2.3

function makePoint(x, y){
    return {xPoint: x, yPoint: y}
}

function midPointSegment(segment){
    return makePoint((segment.origin.xPoint + segment.dest.xPoint) / 2,
        (segment.origin.yPoint + segment.dest.yPoint) / 2,
    )
}

// segments
function makeSegment(pointA, pointB){
    return {origin: pointA, dest: pointB}
}

function getSegmentLength(seg){
    const {origin, dest} = seg;
    const xLen = Math.abs(dest.xPoint - origin.xPoint);
    const yLen = Math.abs(dest.yPoint - origin.yPoint);
    return Math.sqrt( Math.pow(xLen, 2) + Math.pow(yLen, 2));
}

// vectors
function makeVector(o, d){
    return {xTrans: d.xPoint - o.xPoint, yTrans: d.yPoint - o.yPoint }
}

function translatePoint(p, v){
    return makePoint(p.xPoint + v.xTrans, p.yPoint + v.yTrans);
}

// rectangles
function makeRect(o, a, c){
    const vector = makeVector(o,a);
    const b = translatePoint(c, vector);
    return {o,a,b,c}
}

function rectSegments(rect){
    let segmentList = [];
    segmentList.push(makeSegment(rect.o, rect.a));
    segmentList.push(makeSegment(rect.a, rect.b));
    segmentList.push(makeSegment(rect.b, rect.c));
    segmentList.push(makeSegment(rect.c, rect.o));
    return segmentList;
}

function getPerimeter(rect, func){
    if (typeof func === 'function'){
        rect = func(rect);
    }
    //@todo  finish implemented
}


// const origin = makePoint(0,0);
// const a = makePoint(0, 3);
// const c = makePoint(5, 0);
//
// const rect = makeRect(origin,a, c);
// const seg = makeSegment(rect.o, rect.b);

// Ex 2.1.3 ---------------------------------------------

function cons(x, y){
  function dispatch(m){
    switch (m) {
      case 0:
          return x;
        break;
      case 1:
          return y;
          break;
      default:
        throw 'illegal argument'
    }
  }
  return dispatch;
}


const car = z => z(0);
const cdr = z => z(1);

const pair = cons(12,21);

console.log(car(pair), cdr(pair));

// framework --------------------------------------------

const form = document.getElementById('form');
const input = document.getElementById('script');
const result = document.getElementById('result');


const previousValue = localStorage.getItem('previousValue');
if(!!previousValue){
    input.value = previousValue;
}

Math.sqrt(12);

form.addEventListener('submit', function(e){
    e.preventDefault();
    console.clear();
    const val = input.value;
    localStorage.setItem('previousValue', val);

    console.time("script expt1");
    try{
        result.value = eval(val);
    } catch (e){
        result.value = e
    }

    console.timeEnd("script expt1");

    return false;
});
