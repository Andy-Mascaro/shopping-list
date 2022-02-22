
import { renderItem } from '../render-utils.js';

const test = QUnit.test;

test('time to render item', (expect) => {
    
    const expected = '<div class="incomplete items"><p>spice</p></div>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderItem({ complete: false, items:'spice' }); 

    
    expect.equal(actual.outerHTML, expected);
});
