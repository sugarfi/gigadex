var files = [];
var current = 0;
const $ = require('jquery');
function loadFiles() {
    files = localStorage.getItem('files');
    if (files) {files = JSON.parse(files);}
        else {files = [];}
    updateList();}
function updateList() {
    let template = $('#fileTemplate').html();
    $('body').css('cursor', 'progress');
    $('.file').off('click');
    $('.file-delete').off('click');
    $('.list-items').html('');
    if (files.length === 0) {$('.list-items').append('<p>No Files</p>');}
    for (let i in files) {
        let hold = template;
        hold = hold.replace('{{name}}', files[i].name);
        hold = hold.replace('{{size}}', formatBytes(files[i].data.length));
        hold = hold.replace('{{datec}}', new Date(files[i].datec).toLocaleString().replace(', ', ' '));
        hold = hold.replace('{{datem}}', new Date(files[i].datem).toLocaleString().replace(', ', ' '));
        hold = hold.replace('{{id}}', files[i].id);
        $('.list-items').append(hold);}
    $('.file').on('click', function () {
        openFile($(this).index());
    });
    $('.file-delete').on('click', function (e) {
        deleteFile($(this).closest('.file').index());
        e.stopPropagation();
    });
    $('body').css('cursor', 'initial');}
function newFile() {
    current = files.length;
    files.push({
        name: 'Untitled',
        data: '',
        datec: new Date(),
        datem: new Date(),
        id: randID()
    });
    saveFiles();
    openFile(current);
    showEditor();}
function openFile(index) {
    $('body').css('cursor', 'progress');
    current = index;
    $('#name').val(files[index].name);
    $('#document').val(files[index].data);
    showEditor();
    $('body').css('cursor', 'initial');}
function saveFile(index) {
    files[index].data = $('#document').val();
    files[index].datem = new Date();
    saveFiles();}
function renameFile(index) {
    files[index].name = $('#name').val();
    saveFiles();}
function deleteFile(index) {
    if (confirm('Delete "' + files[index].name + '"?')) {
        current = -1;
        files.splice(index, 1);}
    updateList();
    saveFiles();}
function showEditor() {
    $('.fileList').hide();
    $('.document').css('display', 'block');
    $('.title').css('visibility', 'visible');}
function showList() {
    current = -1;
    updateList();
    $('.fileList').show();
    $('.document').hide();
    $('.title').css('visibility', 'hidden');
    $('.infobar').hide();}
function formatBytes(number) {
    if (number > 1000000) {return (number / 1000000).toFixed(1) + 'MB';}
        else if (number > 1000) {return (number / 1000).toFixed(1) + 'KB';}
        else {return number + 'B';}}
function randID() {return Math.random().toString(36).substr(2);}
function saveFiles() {localStorage.setItem('files', JSON.stringify(files));}

$(document).ready(function () {
	$('#name').on('change', function () {
		renameFile(current);
	});

	$('#new').on('click', function() {
		newFile();
	});

	$('#open').on('click', function () {
		showList();
	});

	$('#document').on('keyup', function () {
		saveFile(current);
	});

	$('#document').on('keydown', function (e) {
		if (e.keyCode === 9) {
			let start = this.selectionStart;
			let end = this.selectionEnd;
			let value = $(this).val();
			$(this).val(value.substring(0, start) + "\t" + value.substring(end));
			this.selectionStart = this.selectionEnd = start + 1;
			e.preventDefault();}
	});
	loadFiles();
	showList();
});
