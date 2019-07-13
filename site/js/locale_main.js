var changeLocale = function(langCode) {
	jQuery.i18n.properties({
		name: 'Locales_zh',
		path: 'locale/',
		mode: 'both',
		language: '',
		async: false,
		callback: function() {
			$('[data-locale-msg]').each(function() {
				$(this).html(window[$(this).data('locale-msg')]);
			});
		}
	});
}
$(document).ready(function() {
	changeLocale('');
//	var $langSelect = $('select[name=Language]');
//	$langSelect.change(function(e) {
//		changeLocale(e.target.value);
//		$.cookie('ap_lang_code', e.target.value);
//	});
//	var langCode = $.cookie('ap_lang_code');
//	if(langCode === undefined) {
//		langCode = 'zh-TW';
//	}
//	$langSelect.val(langCode);
//	$langSelect.change();
	$('body').ready(function() {
		$('body').addClass('trshow');
	});
});