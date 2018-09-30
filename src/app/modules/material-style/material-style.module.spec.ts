import { MaterialStyleModule } from './material-style.module';

describe('MaterialStyleModule', () => {
  let materialStyleModule: MaterialStyleModule;

  beforeEach(() => {
    materialStyleModule = new MaterialStyleModule();
  });

  it('should create an instance', () => {
    expect(materialStyleModule).toBeTruthy();
  });
});
