
import { renderItem } from '../render-utils.js';

const test = QUnit.test;

test('time to render item', (expect) => {
    
    const expected = '<ul id="items"><div class="incomplete items"><p>spice</p></div><div class="complete items"><p>potatoes</p></div></ul>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = (renderItem); 

    
    expect.equal(actual.outerHTML, expected);
});
