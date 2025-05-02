import { StyleSheet } from 'react-native';

export const recipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  recipeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#F1F3F4',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  macroContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F4',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  macroSeparator: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#399AA8',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#399AA8',
    fontWeight: 'bold',
  },
  tabContent: {
    backgroundColor: 'white',
    padding: 15,
    minHeight: 300,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#399AA8',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#399AA8',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    lineHeight: 24,
  },
  nutritionContainer: {
    paddingVertical: 10,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  vitaminItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  vitaminName: {
    width: 100,
    fontSize: 14,
    color: '#333333',
  },
  vitaminBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#F1F3F4',
    borderRadius: 5,
    marginRight: 10,
  },
  vitaminBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#399AA8',
  },
  vitaminAmount: {
    width: 40,
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F1F3F4',
    marginRight: 10,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#399AA8',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  primaryActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#399AA8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
