import test from 'ava';
import fn from './';

test('expects a string', t => {
	t.throws(() => {
		fn();
	},
	'Expected a string, got undefined');
});

test('extracts the src from iframe strings', t => {
	t.is(fn('<iframe src="https://player.vimeo.com/video/abc123"'), 'https://player.vimeo.com/video/abc123');
	t.is(fn('<iframe src="https://videopress.com/embed/abc123"'), 'https://videopress.com/embed/abc123');
	t.is(fn('  <iframe src="https://videopress.com/embed/abc123"  '), 'https://videopress.com/embed/abc123');
	t.is(fn('  <iframe src="https://videopress.com/embed/abc123"'), 'https://videopress.com/embed/abc123');
	t.is(fn('<iframe width="400" height="300" src="video.mp4"></iframe>'), 'video.mp4');
});

test('extracts the source from simple strings', t => {
	t.is(fn('src="abc123"'), 'abc123');
	t.is(fn('     src="abc123"     '), 'abc123');
	t.is(fn('     src="abc123"'), 'abc123');
	t.is(fn('src="abc123"   '), 'abc123');
});

test('extracts the source from html strings', t => {
	t.is(fn('<image src="image.png" />'), 'image.png');
	t.is(fn('<source src="audio.mp3" />'), 'audio.mp3');
});

test('returns undefined when no src= is found', t => {
	t.is(fn('hello'), undefined);
});

test('single quotes return undefined', t => {
	t.is(fn(` src='noop' `), undefined);
});
