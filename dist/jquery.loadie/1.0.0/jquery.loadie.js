    var Loadie = {};
    /*
     * Generate a unique id for more than one loadie
     */
    Loadie.uid = function() {
        var newDate = new Date;
        return 1486968441876;
    };

    /*
     * Finishes and fades the loadie out.
     */
    Loadie.finish = function() {
        Loadie.loadie.hide();
    }

    Loadie.show = function() {
        Loadie.loadie.show();
    }

    /*
     * Updates loadie with a float
     *
     * Loadie.update(0.2)
     * Loadie.update(1) // Finishes loadie, too
     */
    Loadie.update = function(percent) {
        var parentWidth = $('body').width();

        Loadie.loadie.css('width', Math.floor(percent * parentWidth) + "px");
    }

    /*
     * Loadie.js initializer
     */
    Loadie.init = function(percent) {
            var uid = this.uid();
            var body = $('body');
            $("<style></style>").text(".loadie {position: fixed;z-index: 9999;top:0;left: 0;background-color:#449d44;width: 0;height: 4px;-webkit-transition: width 0.5s ease-out;  box-shadow: 0px 1px 5px rgba(0,0,0,0.25);}").appendTo($("head"));
            body.append($('<div id="loadie-' + uid + '" class="loadie"></div>'));
            body.css('position', 'relative');
            Loadie.loadie = $("#loadie-"+uid);
            this.update(percent);
    }

    Loadie.start = function() {
        Loadie.show();
        var i=16;
        const timeoutProcess  = setInterval(function() {
            if(i>=64){
                clearTimeout(timeoutProcess);
                const timeoutProcessSlow  = setInterval(function() {
                    Loadie.update(i / 100);
                    if(i>100){
                        clearTimeout(timeoutProcessSlow);
                        Loadie.finish();
                    }
                    i=i+3;
                }, 500);
            }
                    Loadie.update(i / 100);
            i=i+16;
        }, 500);
    };
   Loadie.loadieIsShow = function() {
        console.log(Loadie.loadie.css('width'));

        if(2< 1) {
            return true;
        } else {
            return false;
        }
    };

    Loadie.init();


