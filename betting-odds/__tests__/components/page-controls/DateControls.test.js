import DateControls from '../../../components/page-controls/DateControls.js';

test('is today\'s date', () => {
    var today = new Date();

    // pull private function
    const isToday = DateControls.__get__('isToday');
    const isYesterday = DateControls.__get__('isYesterday');

    expect(isToday(today)).toBeTruthy();
    expect(isYesterday(today)).toBeFalsy();
 });

 test('is yesterdays\'s date', () => {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)

    // pull private function
    const isToday = DateControls.__get__('isToday');
    const isYesterday = DateControls.__get__('isYesterday');

    expect(isYesterday(yesterday)).toBeTruthy();
    expect(isToday(yesterday)).toBeFalsy();
 });