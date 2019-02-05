import { Platform } from 'react-native'

export class FontNames {
  static mainFontRegular = Platform === 'ios' ? 'khula-regular' : 'Lato-Regular';
  static mainFontBold = Platform === 'ios' ? 'khula-semibold' : 'Lato-Bold';

  static secondaryFontRegular = Platform === 'ios' ? 'Catamaran-Regular' : 'Lato-Regular';
  static secondaryFontBold = Platform === 'ios' ? 'Catamaran-SemiBold' : 'Lato-Bold';
  static secondaryFontMedium = Platform === 'ios' ? 'Catamaran-Medium' : 'Lato-Regular';

  static khula = 'khula-regular';
  static khulaBold = 'khula-semibold';
  static catamaran = 'Catamaran-Regular';
  static catamaranMedium = 'Catamaran-Medium';
  static catamaranBold = 'Catamaran-SemiBold'
}