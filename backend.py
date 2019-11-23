import inspect

BOARD_HEIGHT = 19
BOARD_WIDTH = 19

class MaybeStone():
	value = ""

	def __init__(self,value):
		def bad_value(value):
			if (isinstance(value,Stone) or value == ""):
				msg = "Your value for MaybeStone is invalid"
				raise(msg)
		bad_value(value)
		self.value = value

	def get_value(self):
		if self.is_stone():
			return self.value.get_value()
		else:
			return self.value

	def is_stone(self):
		if isinstance(self.value,Stone):
			return True

class Stone():
	value = ""

	def __init__(self,value):
		def bad_value(value):
			if (value == "B" or value == "W"):
				msg = "Your value for Stone is invalid"
				raise(msg)
		bad_value(value)
		self.value = value

	def get_value(self):
		return self.value

class Board():
	board = []

	def __init__(self,board):
		def bad_value(board):
			board_length = len(board)
			if board_length != BOARD_HEIGHT:
				msg = "Board has invalid number of rows"
				raise(msg)
			for i in range(board_length):
				if len(i) != BOARD_WIDTH:
					msg = "Row " + str(i) + " has invalid number of elements"
					raise(msg)
		bad_value(board)
		self.board = board

	def get_value(self,point):
		x,y = point.give_coor()
		return self.board[y][x].get_value()

	def is_occupied(self,point):
		return self.get_value(point) != ""

	def is_occupied_with_stone(self,point,stone):
		stone_value = stone.get_value()
		return self.get_value(point) == stone.get_value()

	def is_reachable(self,point,maybe_stone):
		value = maybe_stone.get_value()

		def bfs(queue = [], visited = []):
			if len(queue) == 0:
				return False
			point = queue[0]
			x,y = point.get_coor()
			point_value = self.get_value(point) 
			if value == point_value:
				return True
			else:
				try:
					point_up = Point(x,y-1)
					if point_up not in visited:
						visited.append(point_up)
				except Exception as e:
					pass
				try:
					point_down = Point(x,y+1)
					if point_down not in visited:
						visited.append(point_down)
				except Exception as e:
					pass
				try:
					point_left = Point(x-1,y)
					if point_left not in visited:
						visited.append(point_left)
				except Exception as e:
					pass
				try:
					point_right = Point(x+1,y)
					if point_right not in visited:
						visited.append(point_right)
				except Exception as e:
					pass

				return bfs(queue[1:],visited)

		bfs(queue = [point])

	def put_value(self,stone,point):
		x,y = point.get_coor()
		self.board[y][x] = point

	def remove_value(self,stone,point):
		x,y = point.get_coor()
		self.board[y][x] = MaybeStone("")

	def place(self,stone,point):
		if self.get_value(point) == "":
			self.put_value(stone,point)
			return self
		return "This seat is taken!"

	def remove(self,stone,point):
		if self.get_value(point) != "":
			self.remove_value(stone,point)
			return self
		return "I am just a board! I cannot remove what is not there!"

	def get_point(self,maybe_stone):
		#i don't know man
		return 0


class Point():
	x = None
	y = None

	def __init__(self,x,y):
		def bad_value(x,y):
			if x < 0 or x >= BOARD_WIDTH:
				msg = "X value of point is invalid"
				raise(msg)
			if y < 0 or y >= BOARD_HEIGHT:
				msg = "Y value of point is invalid"
				raise(msg)
		bad_value(x,y)
		self.x, self.y = x,y

	def get_coor(self):
		return self.x,self.y

	def __eq__(self,point):
		return self.x == point.x and self.y == point.y


class TestFailed(Exception):
	def __init__(self, m):
		self.message = m
	def __str__(self):
		return self.message
	
