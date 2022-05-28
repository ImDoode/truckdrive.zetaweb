var zwDelayed = (function () {
    var refreshControls = function () {
        ZetaControlRefresher.Refresh($(document).find('[cp_disableserverrendering="true"]'));
    };
    refreshControls();
})();