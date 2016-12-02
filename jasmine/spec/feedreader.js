/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test that loops through each feed and ensures it has a URL defined

        it('All urls are defined', function() {
            allFeeds.forEach(function(i) {
                expect(i.url).toBeDefined();
                expect(i.url.length).not.toBe(0);
            });
        });

        // Test that loops through each feed and ensures it has a name defined
        it('All names are defined', function() {
            allFeeds.forEach(function(i) {
                expect(i.name).toBeDefined();
                expect(i.name.length).not.toBe(0);
            });
        });
    });



    describe('The menu', function() {
        it('The menu element is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });


        //Test that ensures the menu changes visibility when the menu icon is clicked. 
        //This test shows does the menu display when icon clicked
        it('Display hidden menu when clicked', function() {
            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass("menu-hidden")).toBe(false);
        });
        //This test shows menu hides when icon clicked again.
        it('hide menu when clicked', function() {

            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });



    //this test show there is atleast a single .entry element within the .feed container.

    describe('Initial Entries', function() {

        beforeEach(function(done) { //beforeEach run before the specs 
            loadFeed(0, done);
        });
        it('Atleast single entry element is found inside feed container', function(done) {

            expect($(".feed .entry").text().length > 0).toBe(true);
            done();
        });
    });


    // This test ensures when a new feed is loaded  by the loadFeed function the content actually changes.      
    describe('New Feed Selection', function() {
        var output1;
        var output2;
        beforeEach(function(done) {

            loadFeed(1, function() {
                output1 = $('.feed').html(); //storing the feed title to output1
                console.log(output1);

                loadFeed(0, function() {

                    done();
                });

            });
        });
        it('The Contents Changed', function() {
            output2 = $('.feed').html(); //storing the next feed title  to output2
            console.log(output2);
            expect(output1).not.toEqual(output2); // checking the outputs are equal or not

        });

    });
}());