import {xpathCreator}from './xpathCreator';
import 'mocha';
import {expect, should} from 'chai';

describe('Xpath creator test', () => {

    describe('create new build test', () => {

        it('create basic builder', function () {
            let builder = new xpathCreator().builder();
            expect(builder).to.have.property('div');
            expect(typeof builder.div).to.equal("function");
        });

        it('create builder that support custom element(testElement)', function () {
            let builder = new xpathCreator()
                .withCustomElements(["testElement"])
                .builder();
            expect(builder).to.have.property('testElement');
            expect(typeof builder.testElement).to.equal("function");
        });

        it('create builder that strat with builded xpath', function () {
            let builder = new xpathCreator().startFrom("test/").builder();
            expect(builder.build()).to.equal("test/");
        });

        it('clear xpath and return to his deafult state', function () {
            let builder = new xpathCreator().startFrom("test/").builder();
            builder.clear();
            expect(builder.build()).to.equal("//");
        });

        it('create builder with custom deafualt xpath state', function () {
            let builder = new xpathCreator("test/")
                .startFrom("test/test")
                .builder();

            expect(builder.build()).to.equal("test/test");
            builder.clear();
            expect(builder.build()).to.equal("test/");
        });


    });

    describe('use builder to build xpath test', () => {
        let builder;
        before(function () {
            builder = new xpathCreator().builder();
        });

        beforeEach(function () {
            builder.clear();
        });

        it('create basic xpath of 2 inside div', function () {
            let xpath = builder.div().div().build();
            expect(xpath).to.equal('//div/div');
        });

        it('create basic xpath of all elements', function () {
            let xpath = builder.all().build();
            expect(xpath).to.equal('//*');
        });

        it('create basic xpath of all elements of div inside div', function () {
            let xpath = builder.div().div().all().build();
            expect(xpath).to.equal('//div/div/*');
        });

        it('create xpath div with classes', function () {
            let xpath = builder.div().withClasses([
                "test1",
                "test2"
            ]).build();

            expect(xpath).to.equal('//div[contains(@class,test1) and contains(@class,test2)]');
        });

        it('create xpath div with style', function () {
            let xpath = builder.div().withStyles({
                display: "none",
                width: "100px"
            }).build();
            expect(xpath).to.equal('//div[contains(@style,display: none) and contains(@style,width: 100px)]');
        });

        it('create xpath div with attribute', function () {
            let xpath = builder.div().withAttribute("data-hook", "test").build();
            expect(xpath).to.equal('//div[@data-hook="test"]');
        });

        it('create xpath div with text', function () {
            let xpath = builder.div().withText("test").build();
            expect(xpath).to.equal('//div[text() = "test"]');
        });

        it('create complex xpath', function () {
            let xpath = builder.div().withText("test")
                .div()
                .withClasses([
                    "class1",
                    "class2"
                ])
                .withStyles({
                    display: "none"
                })
                .input()
                .build();
            expect(xpath)
                .to
                .equal('//div[text() = "test"]/div[contains(@class,class1) and contains(@class,class2)][contains(@style,display: none)]/input');
        });

    });

});