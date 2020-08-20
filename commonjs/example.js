function * helloGenerator()
{
    yield 'hello';
    yield 'world';
    return 'ending';
}

let a = helloGenerator();
console.log();
