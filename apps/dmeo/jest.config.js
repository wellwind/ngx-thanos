module.exports = {
  name: 'dmeo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dmeo/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
